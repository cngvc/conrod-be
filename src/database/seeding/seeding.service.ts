import { Injectable } from '@nestjs/common';
import { Category } from 'categories/entities/category.entity';
import { OrderItem } from 'orders/entities/order-item.entity';
import { Order } from 'orders/entities/order.entity';
import { OrderStatus } from 'orders/enums/order-status.enum';
import { Payment } from 'payments/entities/payment.entity';
import { Product } from 'products/entities/product.entity';
import { DataSource } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Injectable()
export class SeedingService {
  constructor(private readonly dataSource: DataSource) {}
  async seed() {
    console.log(1232);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const usersRepository = queryRunner.manager.getRepository(User);
      const categoriesRepository = queryRunner.manager.getRepository(Category);
      const productsRepository = queryRunner.manager.getRepository(Product);
      const ordersRepository = queryRunner.manager.getRepository(Order);
      const orderItemsRepository = queryRunner.manager.getRepository(OrderItem);
      const paymentsRepository = queryRunner.manager.getRepository(Payment);

      const orders = await ordersRepository.find();
      await ordersRepository.remove(orders);

      const users = await usersRepository.find();
      await usersRepository.remove(users);

      const products = await productsRepository.find();
      await productsRepository.remove(products);

      const categories = await categoriesRepository.find();
      await categoriesRepository.remove(categories);

      const cat1 = categoriesRepository.create({ name: 'Electronics' });
      const cat2 = categoriesRepository.create({ name: 'Books' });
      const cat3 = categoriesRepository.create({ name: 'Computers' });
      const cat4 = categoriesRepository.create({ name: 'Games' });
      await categoriesRepository.save([cat1, cat2, cat3, cat4]);

      const p1 = productsRepository.create({
        name: 'Book of the Cat',
        price: 104.5,
        categories: [cat2],
      });

      const p2 = productsRepository.create({
        name: 'Wifi',
        price: 10.5,
        categories: [cat1],
      });

      const p3 = productsRepository.create({
        name: 'MacBook Pro',
        price: 2050,
        categories: [cat3],
      });

      const p4 = productsRepository.create({
        name: 'Black Milf WuKong',
        price: 2050,
        categories: [cat4],
      });

      const p5 = productsRepository.create({
        name: 'Black Milf WuKong Console',
        price: 2050,
        categories: [cat3, cat4],
      });
      await productsRepository.save([p1, p2, p3, p4, p5]);

      const u1 = usersRepository.create({
        name: 'Joe',
        email: 'joe+1@gmail.com',
        phone: '0359999990',
        password: 'Asdfgh1@3',
      });

      const u2 = usersRepository.create({
        name: 'July',
        email: 'july+1@gmail.com',
        phone: '0359999991',
        password: 'Asdfgh1@3',
      });
      await usersRepository.save([u1, u2]);

      const oi1 = orderItemsRepository.create({
        product: p1,
        quantity: 2,
        price: p1.price,
      });
      const oi2 = orderItemsRepository.create({
        product: p2,
        quantity: 4,
        price: p2.price,
      });
      const oi3 = orderItemsRepository.create({
        product: p3,
        quantity: 3,
        price: p3.price,
      });
      const pay1 = paymentsRepository.create();

      const o1 = ordersRepository.create({
        customer: u1,
        items: [oi1, oi2],
        status: OrderStatus.AWAITING_SHIPMENT,
        payment: pay1,
      });
      const o2 = ordersRepository.create({
        customer: u2,
        items: [oi3],
        status: OrderStatus.AWAITING_PAYMENT,
      });
      await ordersRepository.save([o1, o2]);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
