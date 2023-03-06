import { v4 as uuid } from 'uuid';

import { IsUUID4 } from 'src/shared/validations';
import { ValueObjectBase } from 'src/shared/sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { SemesterIdExistQuery } from '@contexts/student-inscription/domain/queries';

/**
 * Clase que se va a usar para tipar y validar el ID en la entidad Semester
 *
 * @export
 * @class SemesterIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class SemesterIdValueObject extends ValueObjectBase<string> {
  /**
   * Crea una instancia de SemesterIdValueObject.
   * Si no se envia el valor asigna uno por defecto.
   * Tambien pide que se envie un query para validar la existencia del id en la base
   *
   * @param {string} [value]
   * @param {SemesterIdExistQuery} [semesterIdExistQuery]
   * @memberof SemesterIdValueObject
   */
  constructor(value?: string, semesterIdExistQuery?: SemesterIdExistQuery) {
    super(value ?? uuid());
    if (semesterIdExistQuery) {
      this.validateSemesterExist(semesterIdExistQuery);
    }
  }

  /**
   * Corre las validaciones necesarias para el ValueObject SemesterId
   *
   * @memberof SemesterIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un uuid v4
   * Para esto se uson el repositorio de UUID
   *
   * @private
   * @memberof SemesterIdValueObject
   */
  private validateStructure(): void {
    if (this.value && !IsUUID4(this.value)) {
      this.setError({
        field: 'semesterId',
        message: 'El "semesterId" no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }

  /**
   * Valida si el Semester enviado existe en el contexto que lo gestiona
   *
   * @private
   * @param {SemesterIdExistQuery} SemesterIdExistQuery
   * @return {*}  {Promise<void>}
   * @memberof SemesterIdValueObject
   */
  private async validateSemesterExist(
    SemesterIdExistQuery: SemesterIdExistQuery,
  ): Promise<void> {
    if (this.value && !(await SemesterIdExistQuery.query(this.value))) {
      this.setError({
        field: 'semesterId',
        message: 'El "semesterId" informado no existe o aún no esta creado',
      } as IErrorValueObject);
    }
  }
}
