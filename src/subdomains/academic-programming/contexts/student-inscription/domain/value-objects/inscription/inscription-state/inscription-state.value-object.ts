import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import { IsEmpty } from '@validations';

/**
 * Clase que se va a usar para establecer el tipo y validar el estado de la Inscription en la entidad Inscription
 *
 * @export
 * @class InscriptionStateValueObject
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
    if (IsEmpty(this.value)) {
      this.setError({
        field: 'inscriptionState',
        message: 'InscriptionState no puede ser vacío',
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
        message:
          'El valor de InscriptionState no corresponde a un estado válido [cancelled, completed, active]',
      } as IErrorValueObject);
    }
  }
}
