import { Body, Controller, Get, Inject, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserRoleGetAll } from '@application/GetAll/UserRoleGetAll';
import { UserRoleGetOneByUserIdAndRoleId } from '@application/GetOneById/UserRoleGetOneByUserIdAndRoleId';
import { UserRoleCreate } from '@application/Create/UserRoleCreate';
import { UserRoleEdit } from '@application/Edit/UserRoleEdit';
import { UserRoleDelete } from '@application/Delete/UserRoleDelete';
import { Create } from '@infrastructure/NestJs/userRole.validations';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';
import { UserNotFoundError } from '@domain/validations/UserNotFoundError';

@Controller('userRole')
export class UserRoleController {
  constructor(
    @Inject('UserRoleGetAll') private readonly userRoleGetAll: UserRoleGetAll,
    @Inject('UserRoleGetOneByUserIdAndRoleId') private readonly userRoleGetOneById: UserRoleGetOneByUserIdAndRoleId, 
    @Inject('UserRoleCreate') private readonly userRoleCreate: UserRoleCreate,
    @Inject('UserRoleEdit') private readonly userRoleEdit: UserRoleEdit,
    @Inject('UserRoleDelete') private readonly userRoleDelete: UserRoleDelete,
  ) {}

  @Get()
  async getAll() {
    return (await this.userRoleGetAll.run()).map((u) => u.toPlainObject());
  }  

  @Get(':userId/:roleId')
  async getOneByUserIdAndRoleId(
    @Param(
      'userId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El userId debe ser un número entero y mayor que 0', 'Solicitud incorrecta')
      })
    ) userId: number,
    
    @Param(
      'roleId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El roleId debe ser un número entero y mayor que 0', 'Solicitud incorrecta')
      })
    ) roleId: number) 
  {
    try {      
      if (userId < 1 || roleId < 1)  
      {
        const message = "El Ids no debe ser inferiores a 1";
        const error = "Solicitud incorrecta";
        throw new BaseHttpException(message, error);
      }

      return (await this.userRoleGetOneById.run(userId, roleId)).toPlainObject();

    } catch (error) {
      if (error instanceof UserNotFoundError) 
      {
        throw new NotFoundException('Rol no encontrado');
      }
      throw error;
    }
  }

  @Post()
  async create(@Body() body: Create){

    await this.userRoleCreate.run(
        body.userId,
        body.roleId,
        body.status,
    );

    return {
      statusCode: 201,
      message: 'Rol creado con éxito',
    };
  }

  @Put(':userId/:roleId/editRole')
  async editUserRole(
    @Param(
      'userId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El userId debe ser un número entero y mayor que 0', 'Solicitud incorrecta'),
      }),
    ) userId: number,
    
    @Param(
      'roleId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El roleId debe ser un número entero y mayor que 0', 'Solicitud incorrecta'),
      }),
    ) roleId: number,

    @Body('newRoleId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El newRoleId debe ser un número entero y mayor que 0', 'Solicitud incorrecta'),
      }),
    ) newRoleId: number
  ) {
    await this.userRoleEdit.editRole(userId, roleId, newRoleId);

    return {
      statusCode: 200,
      message: 'Rol actualizado con éxito',
    };
  }

  @Put(':userId/:roleId/editUser')
  async editUserOfRole(
    @Param(
      'userId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El userId debe ser un número entero y mayor que 0', 'Solicitud incorrecta'),
      }),
    ) userId: number,
    
    @Param(
      'roleId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El roleId debe ser un número entero y mayor que 0', 'Solicitud incorrecta'),
      }),
    ) roleId: number,

    @Body('newUserId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El newUserId debe ser un número entero y mayor que 0', 'Solicitud incorrecta'),
      }),
    ) newUserId: number
  ) {
    await this.userRoleEdit.editUser(userId, roleId, newUserId);

    return {
      statusCode: 200,
      message: 'Usuario actualizado con éxito',
    };
  }

  @Put(':userId/:roleId/activateUserRole')
  async activateUserRole(
    @Param(
      'userId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El userId debe ser un número entero y mayor que 0', 'Solicitud incorrecta'),
      }),
    ) userId: number,
    
    @Param(
      'roleId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El roleId debe ser un número entero y mayor que 0', 'Solicitud incorrecta'),
      }),
    ) roleId: number
  ) {
    await this.userRoleEdit.editStatus(userId, roleId);

    return {
      statusCode: 200,
      message: 'Rol activado con éxito',
    };
  }

  @Put(':userId/:roleId/deleteUserRole')
  async deleteUserRole(
    @Param(
      'userId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El userId debe ser un número entero y mayor que 0', 'Solicitud incorrecta')
      })
    ) userId: number,
    
    @Param(
      'roleId', 
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () => new BaseHttpException('El roleId debe ser un número entero y mayor que 0', 'Solicitud incorrecta')
      })
    ) roleId: number) 
  {
    await this.userRoleDelete.run(userId, roleId);

    return {
      statusCode: 200,
      message: 'Rol desactivado con éxito',
    };
  }
}
