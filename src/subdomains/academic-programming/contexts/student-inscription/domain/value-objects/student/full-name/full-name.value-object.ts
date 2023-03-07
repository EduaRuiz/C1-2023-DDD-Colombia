import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmpty, StringRangeLength } from '@validations';

/**
 * Clase que se va a usar para establecer el tipo y validar el FullName en la entidad Student
 *
 * @export
 * @class FullNameValueObject
 * @extends {ValueObjectBase<string>}
 */
export class FullNameValueObject extends ValueObjectBase<string> {
  /**
   * Corre las validaciones necesarias para el ValueObject FullName
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof FullNameValueObject
   */
  validateData(): void {
    if (IsEmpty(this.value)) {
      this.setError({
        field: 'fullName',
        message: 'El "fullName" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateLength();
    }
  }

  /**
   * Valida si la longitud de FullName se encuentra dentro del rango
   * minimo 5 caracteres y maximo 255 caracteres
   *
   * @private
   * @memberof FullNameValueObject
   */
  private validateLength(): void {
    if (this.value && !StringRangeLength(this.value, 10, 255)) {
      this.setError({
        field: 'fullName',
        message:
          'La longitud de "fullName" no se encuentra dentro del rango min: 10 y max: 255',
      } as IErrorValueObject);
    }
  }
}
