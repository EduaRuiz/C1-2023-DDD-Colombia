import { ApiProperty } from '@nestjs/swagger';

/**
 * Entidad para inscriptions de Swagger
 *
 * @export
 * @class InscriptionSwaggerEntity
 */
export class InscriptionSwaggerEntity {
  /**
   * Estudiante
   *
   * @type {object}
   * @memberof InscriptionSwaggerEntity
   */
  @ApiProperty()
  Student: object;
  /**
   * Semestre
   *
   * @type {object}
   * @memberof InscriptionSwaggerEntity
   */
  @ApiProperty()
  Semester: object;
  /**
   * Lista de grupos
   *
   * @type {Array<string>}
   * @memberof InscriptionSwaggerEntity
   */
  @ApiProperty()
  Groups: Array<string>;
  /**
   * Estado de la inscripcion
   *
   * @type {string}
   * @memberof InscriptionSwaggerEntity
   */
  @ApiProperty()
  inscriptionState: string;
  /**
   * Fecha de creación
   *
   * @type {Date}
   * @memberof InscriptionSwaggerEntity
   */
  @ApiProperty()
  dateTime: Date;
  /**
   * Id inscripcion
   *
   * @type {string}
   * @memberof InscriptionSwaggerEntity
   */
  @ApiProperty()
  inscriptionId: string;
}
