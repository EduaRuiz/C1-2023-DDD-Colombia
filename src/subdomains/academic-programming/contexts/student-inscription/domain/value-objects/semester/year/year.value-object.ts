import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmptyValidation } from '@validations';

/**
 * Clase que se va a usar para tipar y validar Year en la entidad Semester
 *
 * @export
 * @class YeartValueObject
 * @extends {ValueObjectBase}
 */
export class YearValueObject extends ValueObjectBase<Date> {
  private now = new Date().getFullYear();

  /**
   * Corre las validaciones necesarias para el ValueObject Year
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof YearValueObject
   */
  validateData(): void {
    if (IsEmptyValidation(this.value)) {
      this.setError({
        field: 'professorName',
        message: 'El "professorName" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateCurrentYear();
    }
  }

  /**
   * Valida si year es igual al año en curso
   *
   * @memberof YearValueObject
   */
  validateCurrentYear(): void {
    if (this.value && this.value.getFullYear() !== this.now) {
      this.setError({
        field: 'year',
        message: '"year" no puede ser diferente al año actual',
      } as IErrorValueObject);
    }
  }
}
