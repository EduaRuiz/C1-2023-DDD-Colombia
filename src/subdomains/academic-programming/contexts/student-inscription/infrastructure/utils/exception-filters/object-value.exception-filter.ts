import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValueObjectException } from '@sofka/exceptions';
import { Response } from 'express';

/**
 * Filtro de errores de objetos de valor
 *
 * @export
 * @class ObjectValueExceptionFilter
 * @implements {ExceptionFilter<ValueObjectException>}
 */
@Catch(ValueObjectException)
export class ObjectValueExceptionFilter
  implements ExceptionFilter<ValueObjectException>
{
  /**
   * Captura el error
   *
   * @param {ValueObjectException} exception Excepción
   * @param {ArgumentsHost} host Http
   * @memberof ObjectValueExceptionFilter
   */
  catch(exception: ValueObjectException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus.BAD_REQUEST;
    const errors = exception.errors;

    response.status(statusCode).json({ statusCode, message, errors });
  }
}
