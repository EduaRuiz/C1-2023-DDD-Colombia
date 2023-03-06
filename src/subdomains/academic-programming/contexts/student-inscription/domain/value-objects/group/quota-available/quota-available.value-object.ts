import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import {
  IsEmptyValidation,
  NumberRangeValidation,
} from 'src/shared/validations';

/**
 * Clase que se va a usar para tipar y validar la cuota disponible en la entidad Group
 *
 * @export
 * @class QuotaAvailableValueObject
 * @extends {ValueObjectBase<number>}
 */
export class QuotaAvailableValueObject extends ValueObjectBase<number> {
  /**
   * Corre las validaciones necesarias para el ValueObject QuotaAvailable
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof QuotaAvailableValueObject
   */
  validateData(): void {
    if (IsEmptyValidation(this.value)) {
      this.setError({
        field: 'professorName',
        message: 'El "professorName" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateRange();
    }
  }

  /**
   * Valida si el cupo disponible se encuentra dentro del rango 1 a 30
   *
   * @private
   * @memberof QuotaAvailableValueObject
   */
  private validateRange(): void {
    if (this.value && !NumberRangeValidation(this.value, 1, 30)) {
      this.setError({
        field: 'quotaAvailable',
        message:
          'La "quotaAvailable" no se encuentra dentro del rango min:1 y max 30',
      } as IErrorValueObject);
    }
  }
}
