import { IsIn, IsOptional } from 'class-validator';
import { OrderFilterDto } from 'querying/dto/order-filter.dto';

const Sort = ['name', 'price'] as const;
type Sort = (typeof Sort)[number];

export class ProductsSortDto extends OrderFilterDto {
  @IsOptional()
  @IsIn(Sort)
  readonly sort: Sort = 'name';
}
