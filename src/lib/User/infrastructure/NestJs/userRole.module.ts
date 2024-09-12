import { Module } from '@nestjs/common';
import { UserRoleController } from './userRole.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserRoleEntity } from '@infrastructure/TypeOrm/TypeOrmUserRoleEntity';
import { TypeOrmUserRoleRepository } from '@infrastructure/TypeOrm/TypeOrmUserRoleRepository';

import { UserRoleGetAll } from '@application/GetAll/UserRoleGetAll';
import { UserRoleGetOneByUserIdAndRoleId } from '@application/GetOneById/UserRoleGetOneByUserIdAndRoleId';
import { UserRoleCreate } from '@application/Create/UserRoleCreate';
import { UserRoleEdit } from '@application/Edit/UserRoleEdit';
import { UserRoleDelete } from '@application/Delete/UserRoleDelete';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserRoleEntity])],
  controllers: [UserRoleController],
  providers: [
    {
      provide: 'UserRoleRepository',
      useClass: TypeOrmUserRoleEntity,
    },
    {
      provide: 'UserRoleGetAll',
      useFactory: (repository: TypeOrmUserRoleRepository) => 
        new UserRoleGetAll(repository),
      inject: ['UserRoleRepository'],
    },
    {
      provide: 'UserRoleGetOneByUserIdAndRoleId',
      useFactory: (repository: TypeOrmUserRoleRepository) => 
        new UserRoleGetOneByUserIdAndRoleId(repository),
      inject: ['UserRoleRepository'],
    },
    {
      provide: 'UserRoleCreate',
      useFactory: (repository: TypeOrmUserRoleRepository) => 
        new UserRoleCreate(repository),
      inject: ['UserRoleRepository'],
    },
    {
      provide: 'UserRoleEdit',
      useFactory: (repository: TypeOrmUserRoleRepository) => 
        new UserRoleEdit(repository),
      inject: ['UserRoleRepository'],
    },
    {
      provide: 'UserRoleDelete',
      useFactory: (repository: TypeOrmUserRoleRepository) => 
        new UserRoleDelete(repository),
      inject: ['UserRoleRepository'],
    },
  ],
})
export class UserRoleModule {}

