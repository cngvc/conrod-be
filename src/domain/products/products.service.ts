import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'common/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'common/util/common.constants';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    return this.productRepository.find({
      skip: offset,
      take: limit ?? DEFAULT_PAGE_SIZE.PRODUCT,
      relations: {
        categories: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneOrFail({
      where: { id },
      relations: {
        categories: true,
      },
    });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
