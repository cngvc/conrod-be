import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemDto } from 'orders/dto/order-item.dto';
import { Product } from 'products/entities/product.entity';
import { PaginationDto } from 'querying/dto/pagination.dto';
import { DefaultPageSize } from 'querying/util/query.constants';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto;
    const itemsWithPrice = await Promise.all(
      items.map((item) => this.createOrderItemWithPrice(item)),
    );

    const order = this.orderRepository.create({
      ...createOrderDto,
      items: itemsWithPrice,
    });
    return this.orderRepository.save(order);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;
    return this.orderRepository.find({
      skip: page,
      take: limit ?? DefaultPageSize.ORDER,
      relations: {
        items: {
          product: true,
        },
        customer: true,
        payment: true,
      },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneOrFail({
      where: { id },
      relations: {
        items: {
          product: true,
        },
        customer: true,
        payment: true,
      },
    });
    return order;
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  private async createOrderItemWithPrice(orderItemDto: OrderItemDto) {
    const { id } = orderItemDto.product;
    const product = await this.productRepository.findOneOrFail({
      where: { id },
    });
    return this.orderItemRepository.create({
      ...orderItemDto,
      price: product.price,
    });
  }
}
