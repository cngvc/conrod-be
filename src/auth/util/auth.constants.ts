import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const THROTTLE_MODULE_OPTION: ThrottlerModuleOptions = [
  {
    ttl: 60,
    limit: 10,
  },
];
