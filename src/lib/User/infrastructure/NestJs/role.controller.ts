import { Body, Controller, Get, Inject, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { RoleGetAll } from '@application/GetAll/RoleGetAll';
import { RoleGetOneById } from '@application/GetOneById/RoleGetOneById';
import { RoleGetOneByName } from '@application/GetOneByName/RoleGetOneByName';
import { RoleCreate } from '@application/Create/RoleCreate';
import { RoleEdit } from '@application/Edit/RoleEdit';
import { RoleDelete } from '@application/Delete/RoleDelete';
import { CreateRole } from '@infrastructure/NestJs/role.validations';
import { FindRole } from '@infrastructure/NestJs/role.validations';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';
import { UserNotFoundError } from '@domain/validations/UserNotFoundError';

@Controller('role')
export class RoleController {
  constructor(
    @Inject('RoleGetAll') private readonly roleGetAll: RoleGetAll,
    @Inject('RoleGetOneById') private readonly roleGetOneById: RoleGetOneById, 
    @Inject('RoleGetOneByName') private readonly roleGetOneByName: RoleGetOneByName,
    @Inject('RoleCreate') private readonly roleCreate: RoleCreate,
    @Inject('RoleEdit') private readonly roleEdit: RoleEdit,
    @Inject('RoleDelete') private readonly roleDelete: RoleDelete,
  ) {}

  @Get()
  async getAll() {
    return (await this.roleGetAll.run()).map((u) => u.toPlainObject());
  }  

  @Get('nameRole/:nameRole')
  async getOneByName(@Param('nameRole') nameRole: string) {   
    return (await this.roleGetOneByName.run(nameRole)).toPlainObject();
  }

  @Get(':id')
  async getOneById(
    @Param(
      'id', 
      new ParseIntPipe(
        { 
          errorHttpStatusCode: 400, 
          exceptionFactory: () => new BaseHttpException('El id debe ser un número entero y mayor que 0', 'Solicitud incorrecta')
        }
    )) 
    id: number) 
  {
    try {      
      if (id < 1) 
      {
        const message = "El id no debe ser inferior a 1";
        const error = "Solicitud incorrecta";
        throw new BaseHttpException(message, error);
      }
      return (await this.roleGetOneById.run(id)).toPlainObject();
    } catch (error) {
      if (error instanceof UserNotFoundError) 
      {
        throw new NotFoundException('Rol no encontrado');
      }
      throw error;
    }
  }

  @Post()
  async create(@Body() body: CreateRole){

    await this.roleCreate.run(
        body.nameRole, 
        body.description, 
        body.statusRole ?? 1,
    );

    return {
      statusCode: 201,
      message: 'Rol creado con éxito',
    };
  }

  @Post('find')
  async findRole(@Body() body: FindRole) {
    if (body.id) {
      return (await this.roleGetOneById.run(body.id)).toPlainObject();
    } else if (body.nameRole) {
      return (await this.roleGetOneByName.run(body.nameRole)).toPlainObject();
    } else {
      const message = "Debe proporcionar un id o un rol";
      const error = "Solicitud incorrecta";
      throw new BaseHttpException(message, error);
    }
  }

  @Put(':id/editStatus')
  async editStatus(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number
  ) {
      await this.roleEdit.editStatus(id);

      return {
          statusCode: 200,
          message: 'Estado del Rol editado con éxito',
      };
  }

  @Put(':id/editName')
  async editName(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number, 
    @Body() body: { nameRole: string }
  ) {
      await this.roleEdit.editName(id, body.nameRole);

      return {
          statusCode: 200,
          message: 'Rol editado con éxito',
      };
  }

  @Put(':id/editDescription')
  async editDescription(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number, 
    @Body() body: { description: string }
  ) {
      await this.roleEdit.editDescription(id, body.description);

      return {
          statusCode: 200,
          message: 'Descripción de rol editada con éxito',
      };
  }

  @Put(':id/editNameAndDescription')
  async editNameAndDescription(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number, 
    @Body() body: { nameRole: string, description: string }
  ) {
      await this.roleEdit.editNameAndDescription(id, body.nameRole, body.description);

      return {
          statusCode: 200,
          message: 'Rol y descripción editada con éxito',
      };
  }

  @Put(':id/deleteRole')
  async deleteRole(
    @Param(
      'id', 
      new ParseIntPipe(
        { 
          errorHttpStatusCode: 400, 
          exceptionFactory: () => new BaseHttpException('El id debe ser un número entero y mayor que 0', 'Solicitud incorrecta')
        }
    )) 
    id: number) 
  {
    await this.roleDelete.run(id);

    return {
      statusCode: 200,
      message: 'Rol desactivado con éxito',
    };
  }
}
