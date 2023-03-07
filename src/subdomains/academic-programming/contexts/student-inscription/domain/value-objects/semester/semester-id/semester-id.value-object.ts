import { IsUUID4 } from 'src/shared/validations';
import { ValueObjectBase } from 'src/shared/sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { SemesterIdExistQuery } from '@contexts/student-inscription/domain/queries';

/**
 * Clase que se va a usar para establecer el tipo y validar el ID en la entidad Semester
 *
 * @export
 * @class SemesterIdValueObject
 * @extends {ValueObjectBase<string>}
 */
export class SemesterIdValueObject extends ValueObjectBase<string> {
  /**
   * Query de consulta de existencia del ID
   *
   * @private
   * @type {SemesterIdExistQuery}
   * @memberof SemesterIdValueObject
   */
  private readonly semesterIdExistQuery: SemesterIdExistQuery;

  /**
   * Crea una instancia de SemesterIdValueObject.
   *
   * @param {string} [value]
   * @param {SemesterIdExistQuery} [semesterIdExistQuery]
   * @memberof SemesterIdValueObject
   */
  constructor(value: string, semesterIdExistQuery: SemesterIdExistQuery) {
    super(value);
    this.semesterIdExistQuery = semesterIdExistQuery;
  }

  /**
   * Corre las validaciones necesarias para el ValueObject SemesterId
   *
   * @memberof SemesterIdValueObject
   */
  validateData(): void {
    this.validateStructure();
    this.validateSemesterExist();
  }

  /**
   * Valida si el id enviado cumple con la estructura de un UUID v4
   * Para esto se usó el repositorio de UUID v4
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
   * Valida si el Id enviado existe en el contexto que lo gestiona
   *
   * @private
   * @return {Promise<void>} Establece el error correspondiente si la respuesta es negativa
   * @memberof SemesterIdValueObject
   */
  private async validateSemesterExist(): Promise<void> {
    if (this.value && !(await this.semesterIdExistQuery.query(this.value))) {
      this.setError({
        field: 'semesterId',
        message: 'El "semesterId" informado no existe o aún no esta creado',
      } as IErrorValueObject);
    }
  }
}
