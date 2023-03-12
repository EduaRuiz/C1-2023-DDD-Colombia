import { IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';

/**
 * Clase que se va a usar para establecer el tipo y validar el ID en la entidad Student
 *
 * @export
 * @class StudentIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class StudentIdValueObject extends ValueObjectBase<string> {
  /**
   * Crea una instancia de StudentIdValueObject.
   *
   * @param {string} [value]
   * @memberof StudentIdValueObject
   */
  constructor(value: string) {
    super(value);
  }

  /**
   * Corre las validaciones necesarias para el ValueObject StudentId
   *
   * @memberof StudentIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un UUID v4
   * Para esto se usó el repositorio de UUID v4
   *
   * @private
   * @memberof StudentIdValueObject
   */
  private validateStructure(): void {
    if (this.value && !IsUUID4(this.value)) {
      this.setError({
        field: 'studentId',
        message: 'El "studentId" no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }
}
