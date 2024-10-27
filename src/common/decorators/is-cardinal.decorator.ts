import { applyDecorators, ValidationPipeOptions } from '@nestjs/common';
import { IsInt, IsPositive } from 'class-validator';

/**
 * Check if the value is a positive integer and greater than zero.
 */
export const IsCardinal = (
  validationPipeOptions?: ValidationPipeOptions,
): PropertyDecorator =>
  applyDecorators(
    IsInt(validationPipeOptions),
    IsPositive(validationPipeOptions),
  );
