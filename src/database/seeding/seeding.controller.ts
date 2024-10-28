import { Controller, Post } from '@nestjs/common';
import { SeedingService } from './seeding.service';

@Controller('seeding')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Post()
  seed() {
    this.seedingService.seed();
  }
}
