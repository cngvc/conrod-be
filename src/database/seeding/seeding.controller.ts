import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'auth/decorators/roles.decorator';
import { Role } from 'auth/roles/enums/role.enum';
import { SeedingService } from './seeding.service';

@ApiTags('system')
@Controller('seeding')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Roles(Role.ADMIN)
  @Post()
  seed() {
    this.seedingService.seed();
  }
}
