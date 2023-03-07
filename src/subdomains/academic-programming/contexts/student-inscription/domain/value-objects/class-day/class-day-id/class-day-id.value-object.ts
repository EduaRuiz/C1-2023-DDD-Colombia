import { IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { ClassDayIdExistQuery } from '@contexts/student-inscription/domain/queries';

/**
 * Clase que se va a usar para establecer el tipo y validar el ID en la entidad correspondiente
 *
 * @export
 * @class ClassDayIdValueObject
 * @extends {ValueObjectBase<string>} Base principal de todos los ValueObjects
 */
export class ClassDayIdValueObject extends ValueObjectBase<string> {
  /**
   * Query de consulta de existencia del ID
   *
   * @private
   * @type {ClassDayIdExistQuery}
   * @memberof ClassDayIdValueObject
   */
  private readonly classDayIdExistQuery: ClassDayIdExistQuery;

  /**
   * Crea una instancia de ClassDayIdValueObject.
   *
   * @param {string} [value] Valor inicial del ValueObject
   * @param {ClassDayIdExistQuery} [classDayIdExistQuery] Query que se va a usar para validar si el ID existe
   * @memberof ClassDayIdValueObject
   */
  constructor(value: string, classDayIdExistQuery: ClassDayIdExistQuery) {
    super(value);
    this.classDayIdExistQuery = classDayIdExistQuery;
  }

  /**
   * Corre las validaciones necesarias para el ValueObject ClassDayId
   *
   * @memberof ClassDayIdValueObject
   */
  validateData(): void {
    this.validateStructure();
    this.validateClassDayExist();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un UUID v4
   * Para esto se usó el repositorio de UUID v4
   *
   * @private
   * @memberof ClassDayIdValueObject
   */
  private validateStructure(): void {
    if (this.value && !IsUUID4(this.value)) {
      this.setError({
        field: 'classDayId',
        message: 'El "classDayId" no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }

  /**
   * Valida si el Id enviado existe en el contexto que lo gestiona
   *
   * @private
   * @return  {Promise<void>} Establece el error correspondiente si la respuesta es negativa
   * @memberof ClassDayIdValueObject
   */
  private async validateClassDayExist(): Promise<void> {
    if (this.value && !(await this.classDayIdExistQuery.query(this.value))) {
      this.setError({
        field: 'classDayId',
        message: 'El "classDayId" informado no existe o aún no esta creado',
      } as IErrorValueObject);
    }
  }
}
