import { v4 as uuid } from 'uuid';

import { ValueObjectBase } from '@sofka/bases';
import { IsUUID4 } from '@validations';
import { IErrorValueObject } from '@sofka/interfaces';

/**
 * Clase que se va a usar para establecer el tipo y validar el ID en la entidad Inscription
 *
 * @export
 * @class InscriptionIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class InscriptionIdValueObject extends ValueObjectBase<string> {
  /**
   * Crea una instancia de InscriptionIdValueObject.
   * Si no se envía el valor asigna uno por defecto.
   *
   * @param {string} [value]
   * @memberof InscriptionIdValueObject
   */
  constructor(value?: string) {
    super(value ?? uuid());
  }

  /**
   * Corre las validaciones necesarias para el ValueObject InscriptionId
   *
   * @memberof InscriptionIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un uuid v4
   * Para esto se usó el repositorio de UUID
   *
   * @private
   * @memberof InscriptionIdValueObject
   */
  private validateStructure(): void {
    if (this.value && !IsUUID4(this.value)) {
      this.setError({
        field: 'inscriptionId',
        message: 'El "inscriptionId" no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }
}
