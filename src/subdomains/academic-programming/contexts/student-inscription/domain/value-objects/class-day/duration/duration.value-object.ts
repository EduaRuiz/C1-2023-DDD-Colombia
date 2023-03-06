import { ValueObjectBase } from 'src/shared/sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import {
  IsEmptyValidation,
  NumberRangeValidation,
} from 'src/shared/validations';
/**
 * Clase que se va a usar para tipar y validar Duration en la entidad ClassDay
 *
 * @export
 * @class DurationValueObject
 * @extends {ValueObjectBase<number>}
 */
export class DurationValueObject extends ValueObjectBase<number> {
  /**
   * Corre las validaciones necesarias para el ValueObject Duration
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof DurationValueObject
   */
  validateData(): void {
    if (IsEmptyValidation(this.value)) {
      this.setError({
        field: 'duration',
        message: 'El "duration" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateRange();
    }
  }

  /**
   * Valida si Duration se encuentra dentro del rango 1 hora y 2 horas
   *
   * @private
   * @memberof DurationValueObject
   */
  private validateRange(): void {
    if (
      this.value &&
      !NumberRangeValidation(this.value, 60 * 60 * 1000, 60 * 60 * 1000 * 2)
    ) {
      this.setError({
        field: 'duration',
        message:
          '"duration" no se encuentra dentro del rango min: 1 hora y max: 2 horas',
      } as IErrorValueObject);
    }
  }
}
