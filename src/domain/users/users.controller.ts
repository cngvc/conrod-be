import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from 'auth/decorators/public.decorator';
import { Roles } from 'auth/decorators/roles.decorator';
import { Role } from 'auth/roles/enums/role.enum';
import { IdDto } from 'common/dto/id.dto';
import { PaginationDto } from 'common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.MANAGER)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Roles(Role.MANAGER)
  @Public()
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.MANAGER)
  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.usersService.remove(id);
  }
}
