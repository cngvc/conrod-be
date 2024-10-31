import { Injectable } from '@nestjs/common';
import { PaginationMeta } from './interfaces/pagination-meta.interface';

@Injectable()
export class PaginationService {
  calculateOffset(limit: number, page: number) {
    return (page - 1) * limit;
  }

  createMeta(limit: number, page: number, count: number): PaginationMeta {
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages) return null;

    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    return {
      totalPages,
      hasNextPage,
      hasPrevPage,
      currentPage: page,
      itemsPerPage: limit,
      totalItems: count,
    };
  }
}
