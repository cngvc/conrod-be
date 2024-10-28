import { Expose } from 'class-transformer';
import { RegistryDates } from 'common/embedded/registry-dates.embedded';
import { OrderStatus } from 'orders/enums/order-status.enum';
import { Payment } from 'payments/entities/payment.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'users/entities/user.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.AWAITING_PAYMENT,
  })
  status: OrderStatus;

  @ManyToOne(() => User, (customer) => customer.orders, { nullable: false })
  customer: User;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @OneToOne(() => Payment, (payment) => payment.order, { cascade: true })
  payment: Payment;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Expose()
  get total() {
    if (!this.items?.length) {
      return 0;
    }
    return this.items.reduce((acc, cur) => acc + cur.subTotal, 0);
  }
}
