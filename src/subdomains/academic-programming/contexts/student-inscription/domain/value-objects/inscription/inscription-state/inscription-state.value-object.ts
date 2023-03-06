import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmptyValidation } from '@validations';

/**
 * Clase que se va a usar para tipar y validar el estado de la Inscription en la entidad Inscription
 *
 * @export
 * @class InscriprionStateValueObject
 * @extends {ValueObjectBase<string>}
 */
export class InscriptionStateValueObject extends ValueObjectBase<string> {
  /**
   * Corre las validaciones necesarias para el ValueObject InscriptionState
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof InscriptionStateValueObject
   */
  validateData(): void {
    if (IsEmptyValidation(this.value)) {
      this.setError({
        field: 'inscriptionState',
        message: 'El "inscriptionState" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateInscriptionStateEnum();
    }
  }

  /**
   * Valida si el valor se encuentra dentro de los 3 estados permitidos
   * ['cancelled', 'completed', 'active']
   *
   * @private
   * @memberof InscriptionStateValueObject
   */
  private validateInscriptionStateEnum(): void {
    const states = ['cancelled', 'completed', 'active'];
    if (this.value && states.indexOf(this.value) === -1) {
      this.setError({
        field: 'inscriptionState',
        message: 'El "inscriptionState" no corresponde a un estado válido',
      } as IErrorValueObject);
    }
  }
}
