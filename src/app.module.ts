import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './domain/users/users.module';

@Module({
  imports: [CommonModule, UsersModule, DatabaseModule],
})
export class AppModule {}
