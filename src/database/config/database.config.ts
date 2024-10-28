import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', () => {
  return {
    type: 'postgres',
    url: process.env.DATASOURCE_URL,
    autoLoadEntities: true,
    synchronize: true,
  } as const satisfies TypeOrmModuleOptions;
});
