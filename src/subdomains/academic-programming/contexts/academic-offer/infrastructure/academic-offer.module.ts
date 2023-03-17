import { Module } from '@nestjs/common';
import { AcademicOfferController } from './controllers';

@Module({
  imports: [],
  controllers: [AcademicOfferController],
  providers: [],
  exports: [],
})
export class AcademicOfferModule {}
