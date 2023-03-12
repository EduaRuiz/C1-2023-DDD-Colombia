import { IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';

/**
 * Clase que se va a usar para establecer el tipo y validar el ID en la entidad Group
 *
 * @export
 * @class GroupIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class GroupIdValueObject extends ValueObjectBase<string> {
  /**
   * Crea una instancia de GroupIdValueObject.
   *
   * @param {string} [value] Valor inicial del ValueObject
   * @memberof GroupIdValueObject
   */
  constructor(value: string) {
    super(value);
  }

  /**
   * Corre las validaciones necesarias para el ValueObject GroupId
   *
   * @memberof GroupIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un UUID v4
   * Para esto se usó el repositorio de UUID v4
   *
   * @private
   * @memberof GroupIdValueObject
   */
  private validateStructure(): void {
    if (this.value && !IsUUID4(this.value)) {
      this.setError({
        field: 'groupId',
        message: 'El valor de GroupId no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }
}
