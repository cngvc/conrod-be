import { applyDecorators } from '@nestjs/common';
import { Matches } from 'class-validator';

/**
 * Check if the value is a password
 */

const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const IsPassword = (): PropertyDecorator =>
  applyDecorators(Matches(PASSWORD_REGEX));
