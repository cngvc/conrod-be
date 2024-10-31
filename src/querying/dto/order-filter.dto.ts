import { IsIn, IsOptional } from 'class-validator';

const Order = ['ASC', 'DESC'] as const;
type Order = (typeof Order)[number];

export class OrderFilterDto {
  @IsOptional()
  @IsIn(Order)
  readonly order?: string = 'ASC';
}
