import { ApiProperty } from '@nestjs/swagger';

export const ApiFilesProperty = () => {
  return ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
  });
};
