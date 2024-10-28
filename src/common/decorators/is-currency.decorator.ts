import { applyDecorators } from '@nestjs/common';
import { IsNumber, IsPositive, ValidationOptions } from 'class-validator';

/**
 * Check if the value is a positive number and greater than zero, 2 decimal places
 */
export const IsCurrency = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  applyDecorators(
    IsNumber({ maxDecimalPlaces: 2 }, validationOptions),
    IsPositive(validationOptions),
  );
