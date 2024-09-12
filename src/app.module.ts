import { Module } from '@nestjs/common';
import { UserModule } from '@infrastructure/NestJs/user.module';
import { RoleModule } from '@infrastructure/NestJs/role.module';
import { UserRoleModule } from '@infrastructure/NestJs/userRole.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmUserEntity } from '@infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmRoleEntity } from '@infrastructure/TypeOrm/TypeOrmRoleEntity';
import { TypeOrmUserRoleEntity } from '@infrastructure/TypeOrm/TypeOrmUserRoleEntity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule se aplicará a toda la aplicación
      envFilePath: '.env', // Archivo .env donde se obtienen las variables de entorno
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // La variable de entorno DATABASE_URL es cargada del archivo .env
      entities: [TypeOrmUserEntity, TypeOrmRoleEntity, TypeOrmUserRoleEntity],
      synchronize: process.env.NODE_ENV === 'development', // Solo sincronizar en desarrollo
      autoLoadEntities: true, // Esto carga automáticamente todas las entidades registradas
      logging: process.env.NODE_ENV === 'development', // Registra las consultas SQL en desarrollo
    }), //process.env.NODE_ENV === 'development'
    UserModule, RoleModule, UserRoleModule,
  ],
})
export class AppModule {}

