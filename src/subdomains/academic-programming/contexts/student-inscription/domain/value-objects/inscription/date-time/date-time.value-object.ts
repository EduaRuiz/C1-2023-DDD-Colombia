import { ValueObjectBase } from '@sofka/bases';
import { CurrentDateTime } from '@validations';
import { IErrorValueObject } from '@sofka/interfaces';

/**
 * Clase que se va a usar para establecer el tipo y validar la fecha de creación de la entidad Inscription
 *
 * @export
 * @class DateTimeValueObject
 * @implements {(ValueObjectBase<Date>)}
 */
export class DateTimeValueObject extends ValueObjectBase<Date> {
  /**
   * Crea una instancia de DateTimeValueObject.
   * Si no se envía el valor asigna uno por defecto
   * Adicionalmente inicializa una variable que le permite comparar value frente a la fecha en la que se instanció
   *
   * @param {(Date)} [value]
   * @memberof DateTimeValueObject
   */
  constructor(value?: Date) {
    super(value ?? new Date());
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
    if (this.value && !CurrentDateTime(this.value, new Date(), 1)) {
      this.setError({
        field: 'dateTime',
        message:
          'El valor de DateTime difiere por mas de un segundo a la fecha actual',
      } as IErrorValueObject);
    }
  }
}
