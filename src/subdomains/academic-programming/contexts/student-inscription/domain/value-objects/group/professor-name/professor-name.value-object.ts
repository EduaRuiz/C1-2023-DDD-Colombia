import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmptyValidation, StringRangeLength } from '@validations';

/**
 * Clase que se va a usar para tipar y validar el professorName en la entidad Group
 *
 * @export
 * @class ProfessorNameValueObject
 * @extends {ValueObjectBase<string>}
 */
export class ProfessorNameValueObject extends ValueObjectBase<string> {
  /**
   * Corre las validaciones necesarias para el ValueObject ProfessorName
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof ProfessorNameValueObject
   */
  validateData(): void {
    if (IsEmptyValidation(this.value)) {
      this.setError({
        field: 'professorName',
        message: 'El "professorName" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateLenght();
    }
  }

  /**
   * Valida si la longitud de professorName se encuentra dentro del rango
   * minimo 5 caracteres y maximo 255 caracteres
   *
   * @private
   * @memberof ProfessorNameValueObject
   */
  private validateLenght(): void {
    if (this.value && !StringRangeLength(this.value, 5, 255)) {
      this.setError({
        field: 'professorName',
        message:
          'La longitud de "professorName" no se encuentra dentro del rango min: 5 y max: 255',
      } as IErrorValueObject);
    }
  }
}
