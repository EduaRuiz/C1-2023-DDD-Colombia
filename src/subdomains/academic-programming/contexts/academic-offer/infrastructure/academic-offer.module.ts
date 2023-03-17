import { Module } from '@nestjs/common';
import { AcademicOfferController } from './controllers';

/**
 * Modulo de oferta académica
 *
 * @export
 * @class AcademicOfferModule
 */
@Module({
  imports: [],
  controllers: [AcademicOfferController],
  providers: [],
  exports: [],
})
export class AcademicOfferModule {}
