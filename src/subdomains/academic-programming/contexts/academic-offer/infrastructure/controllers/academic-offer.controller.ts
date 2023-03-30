import { Controller, Get, Param } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Suscriptor para el contexto de inscripciones
 *
 * @export
 * @class AcademicOfferController
 */
@Controller()
@ApiTags('academic-offer-controller')
export class AcademicOfferController {
  @EventPattern('student-inscription.committed-inscription')
  inscriptionCommitted(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log(`
    -----------------------------------------------------------------------
    SUBSCRIPTOR: {student-inscription.committed-inscription}
    
    ${data}, ${context}
    `);
  }

  /**
   * Imprime en consola la cola del tópico indicado
   *
   * @param {*} data Información
   * @param {KafkaContext} context Contexto vigilado
   * @memberof AcademicOfferController
   */
  @EventPattern('student-inscription.unsubscribed-group')
  unsubscribedGroup(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log(`
    -----------------------------------------------------------------------
    SUBSCRIPTOR: {student-inscription.unsubscribed-group}
    
    ${data}, ${context}
    `);
  }

  /**
   * Imprime en consola la cola del tópico indicado
   *
   * @param {*} data Información
   * @param {KafkaContext} context Contexto vigilado
   * @memberof AcademicOfferController
   */
  @EventPattern('student-inscription.subscribed-group')
  subscribedGroup(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log(`
    -----------------------------------------------------------------------
    SUBSCRIPTOR: {student-inscription.subscribed-group}
    
    ${data}, ${context}
    `);
  }

  /**
   * Valida si la solicitud se encuentre en la lista
   *
   * @param {string} subjectId Id materia
   * @return {boolean} Existe?
   * @memberof AcademicOfferController
   */
  @Get('subject-id-exist/:id')
  @ApiOperation({
    summary: 'Valida si existe la materia',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna un boleando',
  })
  subjectIdExist(@Param('id') subjectId: string): boolean {
    const subjectIds = [
      '07b793ce-52d3-4344-b9f1-5fa5e415e3d4',
      '124c2be3-7f85-49de-be4c-b736dc8ead7b',
      '29823381-75c1-46cd-81cf-95944701d3df',
      '492519e4-5b15-49d8-bcea-2c7219e9a278',
      'f191c8c3-9ca1-4248-80db-12098c7eca8b',
      'f593bee8-72be-4688-8e3a-9fad4f2e5160',
      '2293452b-9e55-4a8f-aeb8-a5b6a29cbcaa',
      '90ac6f7e-41ea-4484-8293-0e9e0dcd6663',
      'a2dee450-5d8a-4acc-b4d2-44cc8d110263',
      '1b22d9c1-feb8-43a6-afe5-9bd7124a484e',
      '35e20f59-ce2c-4b26-8fa2-8d206b40e306',
      '8d10fa83-568b-4769-bb29-4c9f662a79e2',
      '8d10fa83-568b-4769-bb29-4c9f662a79e2',
      '8d10fa83-568b-4769-bb29-4c9f662a79e2',
      'ad8d5023-1760-421a-815c-366bd79386e5',
      'dc75123c-79d7-4da4-8c63-b88a0d6f6961',
      'f46fb994-6fbd-41bf-8d9f-f28969c7bc28',
    ];
    return subjectIds.find((id) => subjectId === id) ? true : false;
  }
}
