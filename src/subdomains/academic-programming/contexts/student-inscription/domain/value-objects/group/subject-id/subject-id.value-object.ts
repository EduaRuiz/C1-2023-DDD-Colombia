import { IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { SubjectIdExistQuery } from '@contexts/student-inscription/domain/queries';

/**
 * Clase que se va a usar para establecer el tipo y validar
 *
 * @export
 * @class SubjectIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class SubjectIdValueObject extends ValueObjectBase<string> {
  /**
   * Query de consulta de existencia del ID
   *
   * @private
   * @type {SubjectIdExistQuery}
   * @memberof SubjectIdValueObject
   */
  private readonly SubjectIdExistQuery: SubjectIdExistQuery;

  /**
   * Crea una instancia de SubjectIdValueObject.
   *
   * @param {string} [value] Valor inicial del ValueObject
   * @param {SubjectIdExistQuery} [SubjectIdExistQuery] Query que se va a usar para validar si el ID existe
   * @memberof SubjectIdValueObject
   */
  constructor(value: string, SubjectIdExistQuery: SubjectIdExistQuery) {
    super(value);
    this.SubjectIdExistQuery = SubjectIdExistQuery;
  }

  /**
   * Corre las validaciones necesarias para el ValueObject SubjectId
   *
   * @memberof SubjectIdValueObject
   */
  validateData(): void {
    this.validateStructure();
    this.validateSubjectExist();
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
        message: 'El "SubjectId" no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }

  /**
   * Valida si el Id enviado existe en el contexto que lo gestiona
   *
   * @private
   * @return  {Promise<void>} Establece el error correspondiente si la respuesta es negativa
   * @memberof SubjectIdValueObject
   */
  private async validateSubjectExist(): Promise<void> {
    if (this.value && !(await this.SubjectIdExistQuery.query(this.value))) {
      this.setError({
        field: 'SubjectId',
        message: 'El "SubjectId" informado no existe o aún no esta creado',
      } as IErrorValueObject);
    }
  }
}
