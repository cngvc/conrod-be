import {
  ConflictException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { BASE_PATH } from 'files/util/file.constants';
import { createReadStream } from 'fs';
import { mkdirp, pathExists, readdir, remove, writeFile } from 'fs-extra';
import { join } from 'path';
import { StorageService } from '../storage.service';

@Injectable()
export class FseService implements StorageService {
  async saveFile(path: string, file: Express.Multer.File): Promise<void> {
    const { originalname, buffer } = file;
    const uniqueFilename = this.genUniqueFilename(originalname);
    const fullPath = join(BASE_PATH, path, uniqueFilename);
    await writeFile(fullPath, buffer);
  }
  async createDir(path: string): Promise<void> {
    const fullPath = join(BASE_PATH, path);
    await mkdirp(fullPath);
  }
  getFile(path: string): StreamableFile {
    const fullPath = join(BASE_PATH, path);
    const stream = createReadStream(fullPath);
    return new StreamableFile(stream);
  }
  getDirFilenames(path: string): Promise<string[]> {
    const fullPath = join(BASE_PATH, path);
    return readdir(fullPath);
  }
  async getDirFileCount(path: string): Promise<number> {
    return (await this.getDirFilenames(path))?.length ?? 0;
  }
  async delete(path: string): Promise<void> {
    const fullPath = join(BASE_PATH, path);
    await remove(fullPath);
  }
  async validatePath(path: string): Promise<void> {
    const fullPath = join(BASE_PATH, path);
    if (!(await pathExists(fullPath))) {
      throw new NotFoundException('Path not found');
    }
  }

  validateFileCount(count: number, max: number): void {
    if (count > max) {
      throw new ConflictException('File count exceeds max limit');
    }
  }
  genUniqueFilename(filename: string): string {
    const uniquePrefix = `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
    return `${uniquePrefix}-${filename}`;
  }
}
