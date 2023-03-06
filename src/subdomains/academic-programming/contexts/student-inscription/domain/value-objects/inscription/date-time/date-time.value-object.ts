import { ValueObjectBase } from '@sofka/bases';
import { CurrentDateTimeValidation } from '@validations';
import { IErrorValueObject } from '@sofka/interfaces';

/**
 * Clase que se va a usar para tipar y validar la fecha de creacion en la entidad Inscription
 *
 * @export
 * @class DateTimeValueObject
 * @implements {(ValueObjectBase<number | Date>)}
 */
export class DateTimeValueObject extends ValueObjectBase<Date> {
  /**
   *Variable usada para evaluar DateTimeValueObject
   *
   * @private
   * @type {Date}
   * @memberof DateTimeValueObject
   */
  private now: Date;

  /**
   * Crea una instancia de DateTimeValueObject.
   * Si no se envia el valor asigna uno por defecto
   * Adicionalmente inicializa una variable que le permite comparar value frente a la fecha en la que se instanció
   *
   * @param {(number | Date)} [value]
   * @memberof DateTimeValueObject
   */
  constructor(value?: Date) {
    super(value ?? new Date());
    this.now = new Date();
  }

  /**
   * Corre las validaciones necesarias para el ValueObject DateTime
   *
   * @memberof DateTimeValueObject
   */
  validateData(): void {
    this.validateCurrentDate();
  }

  /**
   * Valida si el valor de la fecha enviado esta dentro del rango de 1 segundo de diferencia
   * con respecto a la fecha actual del sistema
   *
   * @private
   * @memberof DateTimeValueObject
   */
  private validateCurrentDate(): void {
    if (this.value && !CurrentDateTimeValidation(this.value, this.now)) {
      this.setError({
        field: 'dateTime',
        message:
          'El valor de "dateTime" difiere por mas de un segundo a la fecha actual',
      } as IErrorValueObject);
    }
  }
}
