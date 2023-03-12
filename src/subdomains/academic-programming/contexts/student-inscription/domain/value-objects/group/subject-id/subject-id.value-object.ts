import { IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';

/**
 * Clase que se va a usar para establecer el tipo y validar
 *
 * @export
 * @class SubjectIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class SubjectIdValueObject extends ValueObjectBase<string> {
  /**
   * Crea una instancia de SubjectIdValueObject.
   *
   * @param {string} [value] Valor inicial del ValueObject
   * @memberof SubjectIdValueObject
   */
  constructor(value: string) {
    super(value);
  }

  /**
   * Corre las validaciones necesarias para el ValueObject SubjectId
   *
   * @memberof SubjectIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un UUID v4
   * Para esto se usó el repositorio de UUID v4
   *
   * @private
   * @memberof SubjectIdValueObject
   */
  private validateStructure(): void {
    if (this.value && !IsUUID4(this.value)) {
      this.setError({
        field: 'SubjectId',
        message: 'El valor de SubjectId no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }
}
