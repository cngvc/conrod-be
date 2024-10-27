import { Module } from '@nestjs/common';
import { UsersModule } from 'users/users.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';

@Module({
  imports: [EnvModule, CommonModule, DatabaseModule, UsersModule],
})
export class AppModule {}
