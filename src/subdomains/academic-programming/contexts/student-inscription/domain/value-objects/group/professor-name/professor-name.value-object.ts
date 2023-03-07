import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmpty, StringRangeLength } from '@validations';

/**
 * Clase que se va a usar para establecer el tipo y validar el professorName en la entidad Group
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
    if (IsEmpty(this.value)) {
      this.setError({
        field: 'professorName',
        message: 'El "professorName" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateLength();
    }
  }

  /**
   * Valida si la longitud de professorName se encuentra dentro del rango
   * mínimo 5 caracteres y máximo 255 caracteres
   *
   * @private
   * @memberof ProfessorNameValueObject
   */
  private validateLength(): void {
    if (this.value && !StringRangeLength(this.value, 5, 255)) {
      this.setError({
        field: 'professorName',
        message:
          'La longitud de "professorName" no se encuentra dentro del rango min: 5 y max: 255',
      } as IErrorValueObject);
    }
  }
}
