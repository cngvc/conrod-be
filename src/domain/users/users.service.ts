import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestUser } from 'auth/interfaces/request-user.interface';
import { Role } from 'auth/roles/enums/role.enum';
import { compareUserId } from 'auth/util/authorization.util';
import { PaginationDto } from 'querying/dto/pagination.dto';
import { DefaultPageSize } from 'querying/util/query.constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;
    return this.userRepository.find({
      skip: page,
      take: limit ?? DefaultPageSize.USER,
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: {
        orders: {
          items: true,
          payment: true,
        },
      },
    });
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: RequestUser,
  ) {
    if (currentUser.role !== Role.ADMIN) {
      compareUserId(currentUser.id, id);
    }
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save(user);
  }

  async remove(id: number, currentUser: RequestUser) {
    const user = await this.findOne(id);
    if (currentUser.role !== Role.ADMIN) {
      compareUserId(currentUser.id, id);
    }
    await this.userRepository.remove(user);
  }
}
