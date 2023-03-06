import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmptyValidation } from '@validations';

/**
 * Clase que se va a usar para tipar y validar Part en la entidad Semester
 *
 * @export
 * @class PartObjectId
 * @extends {ValueObjectBase<number>}
 */
export class PartValueObject extends ValueObjectBase<number> {
  /**
   * Corre las validaciones necesarias para el ValueObject Part
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof PartObjectId
   */
  validateData(): void {
    if (IsEmptyValidation(this.value)) {
      this.setError({
        field: 'professorName',
        message: 'El "professorName" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validatePart();
    }
  }

  /**
   * Valida si el atributo part es 1 o 2
   *
   * @private
   * @memberof PartObjectId
   */
  private validatePart(): void {
    if (this.value && !(this.value == 1 || this.value == 2)) {
      this.setError({
        field: 'part',
        message: '"part" no puede ser distinto de 1 o 2',
      } as IErrorValueObject);
    }
  }
}
