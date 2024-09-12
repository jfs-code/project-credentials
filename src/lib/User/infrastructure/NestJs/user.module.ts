import { Module } from '@nestjs/common';
import { UserController } from '@infrastructure/NestJs/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from '@infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmUserRepository } from '@infrastructure/TypeOrm/TypeOrmUserRepository';

import { UserGetAll } from '@application/GetAll/UserGetAll';
import { UserGetOneById } from '@application/GetOneById/UserGetOneById';
import { UserCreate } from '@application/Create/UserCreate';
import { UserEdit } from '@application/Edit/UserEdit';
import { UserDelete } from '@application/Delete/UserDelete';
import { UserGetOneByEmail } from '@application/GetOneByEmail/UserGetOneByEmail';
import { UserGetOneByLogin } from '@application/GetOneByLogin/UserGetOneByLogin';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'UserGetAll',
      useFactory: (repository: TypeOrmUserRepository) => 
        new UserGetAll(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserGetOneById',
      useFactory: (repository: TypeOrmUserRepository) => 
        new UserGetOneById(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserGetOneByEmail',
      useFactory: (repository: TypeOrmUserRepository) => 
        new UserGetOneByEmail(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserGetOneByLogin',
      useFactory: (repository: TypeOrmUserRepository) => 
        new UserGetOneByLogin(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserCreate',
      useFactory: (repository: TypeOrmUserRepository) => 
        new UserCreate(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserEdit',
      useFactory: (repository: TypeOrmUserRepository) => 
        new UserEdit(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserDelete',
      useFactory: (repository: TypeOrmUserRepository) => 
        new UserDelete(repository),
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}

