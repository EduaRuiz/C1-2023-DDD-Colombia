import { ValueObjectBase } from 'src/shared/sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import {
  IsEmptyValidation,
  NumberRangeValidation,
} from 'src/shared/validations';

/**
 * Clase que se va a usar para tipar y validar el StartTime en la entidad ClassDay
 *
 * @export
 * @class StartTimeValueObject
 * @extends {ValueObjectBase<string>}
 */
export class StartTimeValueObject extends ValueObjectBase<number> {
  /**
   * Corre las validaciones necesarias para el ValueObject StartTime
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof StartTimeValueObject
   */
  validateData(): void {
    if (IsEmptyValidation(this.value)) {
      this.setError({
        field: 'startTime',
        message: 'El "startTime" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateRange();
    }
  }

  /**
   * Valida si la longitud de StartTime se encuentra dentro del rango
   *  7:00 am y 8:00 pm; y no puede ser la 1:00 pm
   *
   * @private
   * @memberof StartTimeValueObject
   */
  private validateRange(): void {
    if (
      this.value &&
      !NumberRangeValidation(this.value, 7, 20) &&
      this.value !== 13
    ) {
      this.setError({
        field: 'startTime',
        message:
          'La longitud de "startTime" no se encuentra dentro del rango 7:00 am y 8:00 pm; y no puede ser la 1:00 pm',
      } as IErrorValueObject);
    }
  }
}
