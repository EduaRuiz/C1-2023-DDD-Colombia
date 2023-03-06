import { v4 as uuid } from 'uuid';

import { IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { StudentIdExistQuery } from '@contexts/student-inscription/domain/queries';

/**
 * Clase que se va a usar para tipar y validar el ID en la entidad Student
 *
 * @export
 * @class StudentIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class StudentIdValueObject extends ValueObjectBase<string> {
  /**
   * Crea una instancia de StudentIdValueObject.
   * Si no se envia el valor asigna uno por defecto.
   *
   * @param {string} [value]
   * @memberof StudentIdValueObject
   */
  constructor(value?: string, studentIdExistQuery?: StudentIdExistQuery) {
    super(value ?? uuid());
    if (studentIdExistQuery) {
      this.validateStudentExist(studentIdExistQuery);
    }
  }

  /**
   * Corre las validaciones necesarias para el ValueObject StudentId
   *
   * @memberof StudentIdValueObject
   */
  validateData(): void {
    this.validateStructure();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un uuid v4
   * Para esto se uson el repositorio de UUID
   *
   * @private
   * @memberof StudentIdValueObject
   */
  private validateStructure(): void {
    if (this.value && !IsUUID4(this.value)) {
      this.setError({
        field: 'studentId',
        message: 'El "studentId" no tine un formato de UUID válido',
      } as IErrorValueObject);
    }
  }

  /**
   * Valida si el Student enviado existe en el contexto que lo gestiona
   *
   * @private
   * @param {StudentIdExistQuery} StudentIdExistQuery
   * @return {*}  {Promise<void>}
   * @memberof StudentIdValueObject
   */
  private async validateStudentExist(
    StudentIdExistQuery: StudentIdExistQuery,
  ): Promise<void> {
    if (this.value && !(await StudentIdExistQuery.query(this.value))) {
      this.setError({
        field: 'studentId',
        message: 'El "studentId" informado no existe o aún no esta creado',
      } as IErrorValueObject);
    }
  }
}
