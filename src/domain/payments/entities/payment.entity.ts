import { RegistryDates } from 'common/embedded/registry-dates.embedded';
import { Order } from 'orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order, (order) => order.payment, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: Order;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;
}
