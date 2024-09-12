import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRoleEntity } from '@infrastructure/TypeOrm/TypeOrmRoleEntity';
import { TypeOrmRoleRepository } from '@infrastructure/TypeOrm/TypeOrmRoleRepository';

import { RoleGetAll } from '@application/GetAll/RoleGetAll';
import { RoleGetOneById } from '@application/GetOneById/RoleGetOneById';
import { RoleCreate } from '@application/Create/RoleCreate';
import { RoleEdit } from '@application/Edit/RoleEdit';
import { RoleDelete } from '@application/Delete/RoleDelete';
import { RoleGetOneByName } from '@application/GetOneByName/RoleGetOneByName';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmRoleEntity])],
  controllers: [RoleController],
  providers: [
    {
      provide: 'RoleRepository',
      useClass: TypeOrmRoleRepository,
    },
    {
      provide: 'RoleGetAll',
      useFactory: (repository: TypeOrmRoleRepository) => 
        new RoleGetAll(repository),
      inject: ['RoleRepository'],
    },
    {
      provide: 'RoleGetOneById',
      useFactory: (repository: TypeOrmRoleRepository) => 
        new RoleGetOneById(repository),
      inject: ['RoleRepository'],
    },
    {
      provide: 'RoleGetOneByName',
      useFactory: (repository: TypeOrmRoleRepository) => 
        new RoleGetOneByName(repository),
      inject: ['RoleRepository'],
    },
    {
      provide: 'RoleCreate',
      useFactory: (repository: TypeOrmRoleRepository) => 
        new RoleCreate(repository),
      inject: ['RoleRepository'],
    },
    {
      provide: 'RoleEdit',
      useFactory: (repository: TypeOrmRoleRepository) => 
        new RoleEdit(repository),
      inject: ['RoleRepository'],
    },
    {
      provide: 'RoleDelete',
      useFactory: (repository: TypeOrmRoleRepository) => 
        new RoleDelete(repository),
      inject: ['RoleRepository'],
    },
  ],
})
export class RoleModule {}

