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

/**
 * Configuración para implementar TypeOrm
 *
 * @export
 * @class TypeOrmPostgresConfigService
 * @implements {TypeOrmOptionsFactory}
 */
@Injectable()
export class TypeOrmPostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Toma la configuración necesaria para la conexión
   *
   * @return {TypeOrmModuleOptions} Opciones de configuración
   * @memberof TypeOrmPostgresConfigService
   */
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
