import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from 'files/storage/storage.service';
import { BASE_PATH, FilePath, MaxFileCount } from 'files/util/file.constants';
import { pathExists } from 'fs-extra';
import { join } from 'path';
import { FilteringService } from 'querying/filtering.service';
import { PaginationService } from 'querying/pagination.service';
import { DefaultPageSize } from 'querying/util/query.constants';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsQueryDto } from './dto/querying/products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly storageService: StorageService,
    private readonly paginationService: PaginationService,
    private readonly filteringService: FilteringService,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(productsQueryDto: ProductsQueryDto) {
    const { page, name, price, categoryId, sort, order } = productsQueryDto;
    const limit = productsQueryDto.limit ?? DefaultPageSize.PRODUCT;
    const offset = this.paginationService.calculateOffset(limit, page);

    const [data, count] = await this.productRepository.findAndCount({
      where: {
        name: this.filteringService.contains(name),
        price: this.filteringService.compare(price),
        categories: { id: categoryId },
      },
      order: {
        [sort]: order,
      },
      skip: offset,
      take: limit,
    });
    const meta = this.paginationService.createMeta(limit, page, count);
    return { data, meta };
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
    await this.deleteBaseDir(id);
  }

  async uploadImage(id: number, files: Express.Multer.File[]) {
    await this.findOne(id);
    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES);
    if (await pathExists(join(BASE_PATH, path))) {
      const incomingFileCount = files.length;
      const dirFileCount = await this.storageService.getDirFileCount(path);
      const totalFileCount = incomingFileCount + dirFileCount;
      this.storageService.validateFileCount(
        totalFileCount,
        MaxFileCount.PRODUCT_IMAGES,
      );
    }
    await this.storageService.createDir(path);
    await Promise.all(
      files.map((file) => this.storageService.saveFile(path, file)),
    );
  }

  async downloadImage(id: number, filename: string) {
    await this.findOne(id);
    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES, filename);
    await this.storageService.validatePath(path);
    return this.storageService.getFile(path);
  }

  async deleteImage(id: number, filename: string) {
    await this.findOne(id);
    const { BASE, IMAGES } = FilePath.Products;
    const path = join(BASE, id.toString(), IMAGES, filename);
    await this.storageService.validatePath(path);
    return this.storageService.delete(path);
  }

  private async deleteBaseDir(id: number) {
    const { BASE } = FilePath.Products;
    const path = join(BASE, id.toString());
    return this.storageService.delete(path);
  }
}
