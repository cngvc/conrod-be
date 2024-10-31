import { Injectable } from '@nestjs/common';
import {
  Between,
  Equal,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { FilterOperationDto } from './dto/filter-operation.dto';

@Injectable()
export class FilteringService {
  contains(text: string) {
    if (!text) return undefined;
    return ILike(`%${text}%`);
  }

  compare(filterOperationDto: FilterOperationDto) {
    if (!filterOperationDto) return undefined;
    const { operator, operands } = filterOperationDto;
    const [leftOperator, rightOperator] = operands;
    switch (operator) {
      case 'lt':
        return LessThan(leftOperator);
      case 'lte':
        return LessThanOrEqual(leftOperator);
      case 'gt':
        return MoreThan(leftOperator);
      case 'gte':
        return MoreThanOrEqual(leftOperator);
      case 'eq':
        return Equal(leftOperator);
      case 'btw':
        return Between(leftOperator, rightOperator);
      default:
        const exhaustiveCheck: never = operator;
        return exhaustiveCheck;
    }
  }
}
