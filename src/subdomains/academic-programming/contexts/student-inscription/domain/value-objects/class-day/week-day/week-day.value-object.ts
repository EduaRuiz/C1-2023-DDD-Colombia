import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmptyValidation } from '@validations';

/**
 * Clase que se va a usar para tipar y validar el WeekDay en la entidad ClassDay
 *
 * @export
 * @class WeekDayValueObject
 * @extends {ValueObjectBase<string>}
 */
export class WeekDayValueObject extends ValueObjectBase<string> {
  /**
   * Corre las validaciones necesarias para el ValueObject WeekDay
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof WeekDayValueObject
   */
  validateData(): void {
    if (IsEmptyValidation(this.value)) {
      this.setError({
        field: 'weekDay',
        message: 'El "weekDay" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateWeekDay();
    }
  }

  /**
   * Valida si la longitud de WeekDay se encuentra dentro del rango
   *  1 a 6 para que no comprenda domingos
   *
   * @private
   * @memberof WeekDayValueObject
   */
  private validateWeekDay(): void {
    const weekDays = ['L', 'M', 'MC', 'J', 'V', 'S'];
    if (this.value && weekDays.indexOf(this.value) === -1) {
      this.setError({
        field: 'weekDay',
        message:
          '"weekDay" no comprende domingos o dias distintos a [L, M, MC, J, V, S]',
      } as IErrorValueObject);
    }
  }
}
