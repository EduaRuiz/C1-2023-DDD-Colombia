import { v4 as uuid } from 'uuid';

import { ValueObjectBase } from '@sofka/bases';
import { IsEmpty, IsUUID4 } from '@validations';
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
   * Crea una instancia InscriptionIdValueObject
   * procede si se envía un valor lo envía a super y asigna el query
   * de lo contrario crea un nuevo id con la librería UUID v4
   *
   * @param {string} [value] Valor UUID
   * @memberof InscriptionIdValueObject
   */
  constructor(value?: string) {
    super(value ?? uuid());
    if (IsEmpty(value)) {
      this.setError({
        field: 'inscriptionId',
        message: 'InscriptionId no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateData();
    }
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
        message: 'El valor de InscriptionId no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }
}
