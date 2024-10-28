import { applyDecorators } from '@nestjs/common';
import { IsInt, IsPositive, ValidationOptions } from 'class-validator';

/**
 * Check if the value is a positive integer and greater than zero.
 */
export const IsCardinal = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(IsInt(validationOptions), IsPositive(validationOptions));
