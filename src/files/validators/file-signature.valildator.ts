import { FileValidator } from '@nestjs/common';
import magicBytes from 'magic-bytes.js';

export class FileSignatureValidator extends FileValidator {
  constructor() {
    super({});
  }
  buildErrorMessage(): string {
    return 'Invalid file type';
  }

  isValid(file?: Express.Multer.File) {
    const fileSignatures = magicBytes(file.buffer).map((f) => f.mime);
    if (!fileSignatures.length) return false;

    const isMatch = fileSignatures.includes(file.mimetype);
    return isMatch;
  }
}
