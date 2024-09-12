import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  constructor(message: string, error: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
    super({
      statusCode,
      message,
      error,
    }, statusCode);
  }
}
