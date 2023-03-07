import { IsUUID4 } from '@validations';
import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { StudentIdExistQuery } from '@contexts/student-inscription/domain/queries';

/**
 * Clase que se va a usar para establecer el tipo y validar el ID en la entidad Student
 *
 * @export
 * @class StudentIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class StudentIdValueObject extends ValueObjectBase<string> {
  /**
   * Query de consulta de existencia del ID
   *
   * @private
   * @type {StudentIdExistQuery}
   * @memberof StudentIdValueObject
   */
  private readonly studentIdExistQuery: StudentIdExistQuery;

  /**
   * Crea una instancia de StudentIdValueObject.
   *
   * @param {string} [value]
   * @memberof StudentIdValueObject
   */
  constructor(value: string, studentIdExistQuery: StudentIdExistQuery) {
    super(value);
    this.studentIdExistQuery = studentIdExistQuery;
  }

  /**
   * Corre las validaciones necesarias para el ValueObject StudentId
   *
   * @memberof StudentIdValueObject
   */
  validateData(): void {
    this.validateStructure();
    this.validateStudentExist();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un UUID v4
   * Para esto se usó el repositorio de UUID v4
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
   * Valida si el Id enviado existe en el contexto que lo gestiona
   *
   * @private
   * @return {Promise<void>} Establece el error correspondiente si la respuesta es negativa
   * @memberof StudentIdValueObject
   */
  private async validateStudentExist(): Promise<void> {
    if (this.value && !(await this.studentIdExistQuery.query(this.value))) {
      this.setError({
        field: 'studentId',
        message: 'El "studentId" informado no existe o aún no esta creado',
      } as IErrorValueObject);
    }
  }
}
