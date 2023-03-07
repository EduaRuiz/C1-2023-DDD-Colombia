import { IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { GroupIdExistQuery } from '@contexts/student-inscription/domain/queries';

/**
 * Clase que se va a usar para establecer el tipo y validar el ID en la entidad Group
 *
 * @export
 * @class GroupIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class GroupIdValueObject extends ValueObjectBase<string> {
  /**
   * Query de consulta de existencia del ID
   *
   * @private
   * @type {GroupIdExistQuery}
   * @memberof GroupIdValueObject
   */
  private readonly groupIdExistQuery: GroupIdExistQuery;

  /**
   * Crea una instancia de GroupIdValueObject.
   *
   * @param {string} [value] Valor inicial del ValueObject
   * @param {GroupIdExistQuery} [groupIdExistQuery] Query que se va a usar para validar si el ID existe
   * @memberof GroupIdValueObject
   */
  constructor(value: string, groupIdExistQuery: GroupIdExistQuery) {
    super(value);
    this.groupIdExistQuery = groupIdExistQuery;
  }

  /**
   * Corre las validaciones necesarias para el ValueObject GroupId
   *
   * @memberof GroupIdValueObject
   */
  validateData(): void {
    this.validateStructure();
    this.validateGroupExist();
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
        message: 'El "groupId" no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }

  /**
   * Valida si el Id enviado existe en el contexto que lo gestiona
   *
   * @private
   * @return  {Promise<void>} Establece el error correspondiente si la respuesta es negativa
   * @memberof GroupIdValueObject
   */
  private async validateGroupExist(): Promise<void> {
    if (this.value && !(await this.groupIdExistQuery.query(this.value))) {
      this.setError({
        field: 'groupId',
        message: 'El "groupId" informado no existe o aún no esta creado',
      } as IErrorValueObject);
    }
  }
}
