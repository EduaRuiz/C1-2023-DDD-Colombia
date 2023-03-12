import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmpty, NumberRange } from '@validations';

/**
 * Clase que se va a usar para establecer el tipo y validar la cuota disponible en la entidad Group
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
    if (IsEmpty(this.value)) {
      this.setError({
        field: 'quotaAvailable',
        message: 'QuotaAvailable no puede ser vacío',
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
    if (this.value && !NumberRange(this.value, 0, 30)) {
      this.setError({
        field: 'quotaAvailable',
        message:
          'El valor de QuotaAvailable no se encuentra dentro del rango min:0 y max 30',
      } as IErrorValueObject);
    }
  }
}
