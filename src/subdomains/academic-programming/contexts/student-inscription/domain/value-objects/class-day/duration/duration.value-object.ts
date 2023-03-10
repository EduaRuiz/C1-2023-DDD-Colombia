import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmpty, NumberRange } from '@validations';
/**
 * Clase que se va a usar para establecer el tipo y validar Duration en la entidad ClassDay
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
    if (IsEmpty(this.value)) {
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
    if (this.value && !NumberRange(this.value, 60, 60 * 2)) {
      this.setError({
        field: 'duration',
        message:
          '"duration" no se encuentra dentro del rango min: 1 hora y max: 2 horas',
      } as IErrorValueObject);
    }
  }
}
