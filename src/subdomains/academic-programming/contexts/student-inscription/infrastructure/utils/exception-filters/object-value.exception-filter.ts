import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValueObjectException } from '@sofka/exceptions';
import { Response } from 'express';

@Catch(ValueObjectException)
export class ObjectValueExceptionFilter
  implements ExceptionFilter<ValueObjectException>
{
  catch(exception: ValueObjectException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus.BAD_REQUEST;
    const errors = exception.errors;

    response.status(statusCode).json({ statusCode, message, errors });
  }
}
