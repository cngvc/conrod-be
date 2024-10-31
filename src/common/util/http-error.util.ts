import { HttpStatus } from '@nestjs/common';

export const HttpError = {
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    error: 'Not Found',
  },
  CONFLICT: {
    status: HttpStatus.CONFLICT,
    error: 'Conflict',
  },
  PAYLOAD_TOO_LARGE: {
    status: HttpStatus.PAYLOAD_TOO_LARGE,
    error: 'Payload Too Large',
  },
  BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    error: 'Bad Request',
  },
  UNSUPPORTED_MEDIA_TYPE: {
    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    error: 'Unsupported media type',
  },
} as const satisfies Record<string, IHttpError>;

interface IHttpError {
  readonly status: HttpStatus;
  readonly error: string;
}

export type HttpError = (typeof HttpError)[keyof typeof HttpError];
