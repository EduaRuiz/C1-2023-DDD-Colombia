import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmptyValidation } from '@validations';

/**
 * Clase que se va a usar para tipar y validar el estado del Group en la entidad Group
 *
 * @export
 * @class InscriprionStateValueObject
 * @extends {ValueObjectBase<string>}
 */
export class GroupStateValueObject extends ValueObjectBase<string> {
  /**
   * Corre las validaciones necesarias para el ValueObject GroupState
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof GroupStateValueObject
   */
  validateData(): void {
    if (IsEmptyValidation(this.value)) {
      this.setError({
        field: 'GroupState',
        message: 'El "GroupState" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateGroupStateEnum();
    }
  }

  /**
   * Valida si el valor se encuentra dentro de los 3 estados permitidos
   * ['cancelled', 'completed', 'active']
   *
   * @private
   * @memberof GroupStateValueObject
   */
  private validateGroupStateEnum(): void {
    const states = ['open'];
    if (states.indexOf(this.value) === -1) {
      this.setError({
        field: 'groupState',
        message: 'El "groupState" no corresponde a un estado válido',
      } as IErrorValueObject);
    }
  }
}
