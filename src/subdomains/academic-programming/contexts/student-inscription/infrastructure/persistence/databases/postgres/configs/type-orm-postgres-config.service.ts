import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  ClassDayPostgresEntity,
  GroupPostgresEntity,
  InscriptionPostgresEntity,
  SemesterPostgresEntity,
  StudentPostgresEntity,
} from '../entities';

@Injectable()
export class TypeOrmPostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [
        InscriptionPostgresEntity,
        GroupPostgresEntity,
        StudentPostgresEntity,
        SemesterPostgresEntity,
        ClassDayPostgresEntity,
      ],
      synchronize: true,
      logging: true,
    };
  }
}
