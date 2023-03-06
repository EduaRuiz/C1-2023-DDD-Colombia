import { v4 as uuid } from 'uuid';

import { IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { ClassDayIdExistQuery } from '@contexts/student-inscription/domain/queries';

/**
 * Clase que se va a usar para tipar y validar el ID en la entidad ClassDay
 *
 * @export
 * @class ClassDayIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class ClassDayIdValueObject extends ValueObjectBase<string> {
  /**
   * Crea una instancia de ClassDayIdValueObject.
   * Si no se envia el valor asigna uno por defecto.
   *
   * @param {string} [value]
   * @memberof ClassDayIdValueObject
   */
  constructor(value?: string, classDayIdExistQuery?: ClassDayIdExistQuery) {
    super(value ?? uuid());
    if (classDayIdExistQuery) {
      this.validateClassDayExist(classDayIdExistQuery);
    }
  }

  /**
   * Corre las validaciones necesarias para el ValueObject ClassDayId
   *
   * @memberof ClassDayIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un uuid v4
   * Para esto se uson el repositorio de UUID
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
   * Valida si el ClassDayId enviado existe en el contexto que lo gestiona
   *
   * @private
   * @param {ClassDayIdExistQuery} classDayIdExistQuery
   * @return {*}  {Promise<void>}
   * @memberof ClassDayIdValueObject
   */
  private async validateClassDayExist(
    classDayIdExistQuery: ClassDayIdExistQuery,
  ): Promise<void> {
    if (this.value && !(await classDayIdExistQuery.query(this.value))) {
      this.setError({
        field: 'classDayId',
        message: 'El "classDayId" informado no existe o aún no esta creado',
      } as IErrorValueObject);
    }
  }
}
