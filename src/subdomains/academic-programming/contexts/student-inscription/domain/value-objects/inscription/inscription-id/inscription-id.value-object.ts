import { v4 as uuid } from 'uuid';

import { ValueObjectBase } from '@sofka/bases';
import { IsUUID4 } from '@validations';
import { IErrorValueObject } from '@sofka/interfaces';
import { InscriptionIdExistQuery } from '../../../queries/inscription-id-exist.query';

/**
 * Clase que se va a usar para establecer el tipo y validar el ID en la entidad Inscription
 *
 * @export
 * @class InscriptionIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class InscriptionIdValueObject extends ValueObjectBase<string> {
  /**
   * Query de consulta de existencia del ID
   *
   * @private
   * @type {InscriptionIdExistQuery}
   * @memberof InscriptionIdValueObject
   */
  private readonly inscriptionIdExistQuery?: InscriptionIdExistQuery;

  /**
   * Crea una instancia InscriptionIdValueObject
   * sin recibir parámetros
   *
   * @memberof InscriptionIdValueObject
   */
  constructor();
  /**
   * Crea una instancia InscriptionIdValueObject
   * Exigiendo el query de consulta si se pasa el valor del id
   *
   * @param {string} value UUID va de la inscripción
   * @param {InscriptionIdExistQuery} [inscriptionIdExistQuery] Query de consulta existencia ID
   * @memberof InscriptionIdValueObject
   */
  constructor(value: string, inscriptionIdExistQuery: InscriptionIdExistQuery);
  /**
   * Crea una instancia InscriptionIdValueObject
   * procede si se envía un valor lo envía a super y asigna el query
   * de lo contrario crea un nuevo id con la librería UUID v4
   *
   * @param {string} [value] Valor UUID
   * @param {InscriptionIdExistQuery} [inscriptionIdExistQuery] Query de consulta existencia ID
   * @memberof InscriptionIdValueObject
   */
  constructor(
    value?: string,
    inscriptionIdExistQuery?: InscriptionIdExistQuery,
  ) {
    super(value ?? uuid());
    this.inscriptionIdExistQuery = inscriptionIdExistQuery;
  }

  /**
   * Corre las validaciones necesarias para el ValueObject InscriptionId
   *
   * @memberof InscriptionIdValueObject
   */
  validateData(): void {
    this.validateStructure();
    if (this.value && this.inscriptionIdExistQuery) {
      this.validateSemesterExist(this.inscriptionIdExistQuery);
    }
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

  /**
   * Valida si el Id enviado existe en el contexto que lo gestiona
   *
   * @private
   * @return {Promise<void>} Establece el error correspondiente si la respuesta es negativa
   * @memberof SemesterIdValueObject
   */
  private async validateSemesterExist(
    inscriptionIdExistQuery: InscriptionIdExistQuery,
  ): Promise<void> {
    if (this.value && !(await inscriptionIdExistQuery.query(this.value))) {
      this.setError({
        field: 'semesterId',
        message: 'El "semesterId" informado no existe o aún no esta creado',
      } as IErrorValueObject);
    }
  }
}
