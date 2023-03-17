import { StudentInscriptionModule } from '@contexts/student-inscription/infrastructure';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { AcademicOfferModule } from './subdomains/academic-programming/contexts/academic-offer/infrastructure/academic-offer.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

/**
 * Modulo principal
 *
 * @export
 * @class AppModule
 */
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'llave',
      signOptions: { expiresIn: '2h' },
    }),
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
