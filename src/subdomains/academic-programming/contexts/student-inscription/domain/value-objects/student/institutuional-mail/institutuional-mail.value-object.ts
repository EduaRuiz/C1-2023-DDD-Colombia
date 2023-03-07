import { ValueObjectBase } from '@sofka/bases';
import { IErrorValueObject } from '@sofka/interfaces';
import {
  IsEmpty,
  IsInstitutionalMail,
  IsMailStructure,
} from 'src/shared/validations';

/**
 * Clase que se va a usar para establecer el tipo y validar el InstitutionalMail en la entidad Student
 *
 * @export
 * @class InstitutionalMailValueObject
 * @extends {ValueObjectBase<string>}
 */
export class InstitutionalMailValueObject extends ValueObjectBase<string> {
  /**
   * Corre las validaciones necesarias para el ValueObject InstitutionalMail
   * Internamente antes de las validaciones comprueba que el valor no sea vacío
   *
   * @memberof InstitutionalMailValueObject
   */
  validateData(): void {
    if (IsEmpty(this.value)) {
      this.setError({
        field: 'institutionalMail',
        message: 'El "institutionalMail" no puede ser vacío',
      } as IErrorValueObject);
    } else {
      this.validateStructure();
      this.validateInstitutionalMailDomain();
    }
  }

  /**
   * Valida si el mail suministrado cumple con la estructura de un mail válido
   *
   * @private
   * @memberof InstitutionalMailValueObject
   */
  private validateStructure(): void {
    if (this.value && !IsMailStructure(this.value)) {
      this.setError({
        field: 'institutionalMail',
        message:
          '"institutionalMail" no cumple con la estructura de un mail válido',
      } as IErrorValueObject);
    }
  }

  /**
   * Valida si InstitutionalMail incluye el dominio "sofka.edu.co"
   *
   * @private
   * @memberof InstitutionalMailValueObject
   */
  private validateInstitutionalMailDomain(): void {
    if (this.value && !IsInstitutionalMail(this.value, 'sofka.edu.co')) {
      this.setError({
        field: 'institutionalMail',
        message: '"institutionalMail" no es del dominio de "sofka.edu.co"',
      } as IErrorValueObject);
    }
  }
}
