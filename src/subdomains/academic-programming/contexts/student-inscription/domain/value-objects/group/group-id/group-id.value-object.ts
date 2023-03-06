import { v4 as uuid } from 'uuid';

import { IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { GroupIdExistQuery } from '@contexts/student-inscription/domain/queries';

/**
 * Clase que se va a usar para tipar y validar el ID en la entidad Group
 *
 * @export
 * @class GroupIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class GroupIdValueObject extends ValueObjectBase<string> {
  /**
   * Crea una instancia de GroupIdValueObject.
   * Si no se envia el valor asigna uno por defecto.
   *
   * @param {string} [value]
   * @memberof GroupIdValueObject
   */
  constructor(value?: string, groupIdExistQuery?: GroupIdExistQuery) {
    super(value ?? uuid());
    if (groupIdExistQuery) {
      this.validateGroupExist(groupIdExistQuery);
    }
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
   * Valida si el id enviado cumple con la estructura de un uuid v4
   * Para esto se uson el repositorio de UUID
   *
   * @private
   * @memberof GroupIdValueObject
   */
  private validateStructure(): void {
    if (this.value && !IsUUID4(this.value)) {
      this.setError({
        field: 'groupId',
        message: 'El "groupId" no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }

  /**
   * Valida si el Group enviado existe en el contexto que lo gestiona
   *
   * @private
   * @param {GroupIdExistQuery} GroupIdExistQuery
   * @return {*}  {Promise<void>}
   * @memberof GroupIdValueObject
   */
  private async validateGroupExist(
    GroupIdExistQuery: GroupIdExistQuery,
  ): Promise<void> {
    if (this.value && !(await GroupIdExistQuery.query(this.value))) {
      this.setError({
        field: 'groupId',
        message: 'El "groupId" informado no existe o aún no esta creado',
      } as IErrorValueObject);
    }
  }
}
