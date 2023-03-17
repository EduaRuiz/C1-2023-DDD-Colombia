import { StudentInscriptionModule } from '@contexts/student-inscription/infrastructure';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { AcademicOfferModule } from './subdomains/academic-programming/contexts/academic-offer/infrastructure/academic-offer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
    }),
    StudentInscriptionModule,
    AcademicOfferModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
