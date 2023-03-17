import { ApiProperty } from '@nestjs/swagger';

/**
 * Entidad para grupos Swagger
 *
 * @export
 * @class GroupSwaggerEntity
 */
export class GroupSwaggerEntity {
  /**
   * Id de grupo
   *
   * @type {string}
   * @memberof GroupSwaggerEntity
   */
  @ApiProperty()
  groupId: string;
  /**
   * Lista de días de clase
   *
   * @type {Array<object>}
   * @memberof GroupSwaggerEntity
   */
  @ApiProperty()
  classDays: Array<object>;
  /**
   * Nombre materia
   *
   * @type {string}
   * @memberof GroupSwaggerEntity
   */
  @ApiProperty()
  subjectName: string;
  /**
   * Id materia
   *
   * @type {string}
   * @memberof GroupSwaggerEntity
   */
  @ApiProperty()
  subjectId: string;
  /**
   * Nombre profesor
   *
   * @type {string}
   * @memberof GroupSwaggerEntity
   */
  @ApiProperty()
  professorName: string;
  /**
   * Cupos disponibles
   *
   * @type {number}
   * @memberof GroupSwaggerEntity
   */
  @ApiProperty()
  quoteAvailable: number;
  /**
   * Estado del grupo
   *
   * @type {string}
   * @memberof GroupSwaggerEntity
   */
  @ApiProperty()
  groupState: string;
}
