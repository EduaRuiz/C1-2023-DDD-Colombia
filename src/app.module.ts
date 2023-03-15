import { StudentInscriptionModule } from '@contexts/student-inscription/infrastructure';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
