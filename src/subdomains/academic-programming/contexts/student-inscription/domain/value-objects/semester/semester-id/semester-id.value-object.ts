import { IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';

/**
 * Clase que se va a usar para establecer el tipo y validar el ID en la entidad Semester
 *
 * @export
 * @class SemesterIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class SemesterIdValueObject extends ValueObjectBase<string> {
  /**
   * Crea una instancia de SemesterIdValueObject.
   *
   * @param {string} [value]
   * @memberof SemesterIdValueObject
   */
  constructor(value: string) {
    super(value);
  }

  /**
   * Corre las validaciones necesarias para el ValueObject SemesterId
   *
   * @memberof SemesterIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un UUID v4
   * Para esto se usó el repositorio de UUID v4
   *
   * @private
   * @memberof SemesterIdValueObject
   */
  private validateStructure(): void {
    if (this.value && !IsUUID4(this.value)) {
      this.setError({
        field: 'semesterId',
        message: 'El valor de SemesterId no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }
}
