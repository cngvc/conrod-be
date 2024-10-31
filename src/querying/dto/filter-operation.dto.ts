import { IsIn, IsNumber } from 'class-validator';
import { ValidateFilterOperandsLength } from 'querying/decorators/validate-filter-operands-length.decorators';

const Operator = ['lt', 'lte', 'gt', 'gte', 'eq', 'btw'] as const;
type Operator = (typeof Operator)[number];

export class FilterOperationDto {
  @IsIn(Operator)
  readonly operator: Operator;

  @IsNumber({}, { each: true })
  readonly operands: number[];

  @ValidateFilterOperandsLength()
  private readonly manyFieldValidation: unknown;
}
