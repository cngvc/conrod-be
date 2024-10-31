import { ApiProperty } from '@nestjs/swagger';

export const ApiFileProperty = () => {
  return ApiProperty({
    type: 'string',
    format: 'binary',
  });
};
