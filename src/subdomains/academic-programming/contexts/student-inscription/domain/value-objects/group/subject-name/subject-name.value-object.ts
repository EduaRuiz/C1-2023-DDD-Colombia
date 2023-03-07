import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmpty, StringRangeLength } from '@validations';

/**
 * Clase que se va a usar para establecer el tipo y validar el nombre de la materia en la entidad Group
 *
 * @export
 * @class SubjectNameValueObject
 * @extends {ValueObjectBase<string>}
 */
export class SubjectNameValueObject extends ValueObjectBase<string> {
  /**
   * Corre las validaciones necesarias para el ValueObject SubjectName
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof SubjectNameValueObject
   */
  validateData(): void {
    if (IsEmpty(this.value)) {
      this.setError({
        field: 'subjectName',
        message: 'El "subjectName" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateLength();
    }
  }

  /**
   * Valida si la longitud de SubjectName se encuentra dentro del rango
   * minimo 5 caracteres y maximo 255 caracteres
   *
   * @private
   * @memberof SubjectNameValueObject
   */
  private validateLength(): void {
    if (this.value && !StringRangeLength(this.value, 3, 255)) {
      this.setError({
        field: 'subjectName',
        message:
          'La longitud de "subjectName" no se encuentra dentro del rango min: 3 y max: 255',
      } as IErrorValueObject);
    }
  }
}
