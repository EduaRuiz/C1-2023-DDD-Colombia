import { IsEmpty, IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';

/**
 * Clase que se va a usar para establecer el tipo y validar el ID en la entidad correspondiente
 *
 * @export
 * @class ClassDayIdValueObject
 * @extends {ValueObjectBase<string>} Base principal de todos los ValueObjects
 */
export class ClassDayIdValueObject extends ValueObjectBase<string> {
  /**
   * Crea una instancia de ClassDayIdValueObject.
   *
   * @param {string} [value] Valor inicial del ValueObject
   * @memberof ClassDayIdValueObject
   */
  constructor(value: string) {
    super(value);
    if (IsEmpty(value)) {
      this.setError({
        field: 'classDayId',
        message: 'ClassDayId no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateData();
    }
  }

  /**
   * Corre las validaciones necesarias para el ValueObject ClassDayId
   *
   * @memberof ClassDayIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un UUID v4
   * Para esto se usó el repositorio de UUID v4
   *
   * @private
   * @memberof ClassDayIdValueObject
   */
  private validateStructure(): void {
    if (this.value && !IsUUID4(this.value)) {
      this.setError({
        field: 'classDayId',
        message: 'El valor de ClassDayId no tiene un formato de UUID válido',
      } as IErrorValueObject);
    }
  }
}
