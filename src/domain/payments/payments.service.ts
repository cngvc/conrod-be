import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'orders/entities/order.entity';
import { OrderStatus } from 'orders/enums/order-status.enum';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async payOrder(id: number) {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      relations: {
        payment: true,
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.payment) {
      throw new ConflictException('Order already paid');
    }
    const payment = this.paymentRepository.create();
    order.payment = payment;
    order.status = OrderStatus.AWAITING_SHIPMENT;
    return this.orderRepository.save(order);
  }
}
