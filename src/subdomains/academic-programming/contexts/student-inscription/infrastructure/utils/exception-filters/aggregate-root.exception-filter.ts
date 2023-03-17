import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { AggregateRootException } from '@sofka/exceptions';
import { Response } from 'express';

@Catch(AggregateRootException)
export class AggregateRootExceptionFilter
  implements ExceptionFilter<AggregateRootException>
{
  catch(exception: AggregateRootException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus.BAD_REQUEST;
    const errors = exception.message;

    response.status(statusCode).json({ statusCode, message, errors });
  }
}
