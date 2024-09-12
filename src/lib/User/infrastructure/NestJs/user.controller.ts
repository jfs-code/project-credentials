import { Body, Controller, Get, Inject, NotFoundException, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { UserGetAll } from '@application/GetAll/UserGetAll';
import { UserGetOneById } from '@application/GetOneById/UserGetOneById';
import { UserGetOneByEmail } from '@application/GetOneByEmail/UserGetOneByEmail';
import { UserGetOneByLogin } from '@application/GetOneByLogin/UserGetOneByLogin';
import { UserCreate } from '@application/Create/UserCreate';
import { UserEdit } from '@application/Edit/UserEdit';
import { UserDelete } from '@application/Delete/UserDelete';
import { Create } from '@infrastructure/NestJs/user.validations';
import { FindUser } from '@infrastructure/NestJs/user.validations';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';
import { UserNotFoundError } from '@domain/validations/UserNotFoundError';
import * as bcryptjs from 'bcryptjs';

@Controller('user')
export class UserController {
  constructor(
    @Inject('UserGetAll') private readonly userGetAll: UserGetAll,
    @Inject('UserGetOneById') private readonly userGetOneById: UserGetOneById,
    @Inject('UserGetOneByEmail') private readonly userGetOneByEmail: UserGetOneByEmail,
    @Inject('UserGetOneByLogin') private readonly userGetOneByLogin: UserGetOneByLogin,
    @Inject('UserCreate') private readonly userCreate: UserCreate,
    @Inject('UserEdit') private readonly userEdit: UserEdit,
    @Inject('UserDelete') private readonly userDelete: UserDelete,
  ) {}

  @Get()
  async getAll() {
    return (await this.userGetAll.run()).map((u) => u.toPlainObject());
  }  

  
  @Get('email/:email')
  async getOneByEmail(@Param('email') email: string) {   
    return (await this.userGetOneByEmail.run(email)).toPlainObject();
  }

  @Get('login/:login')
  async getOneByLogin(@Param('login') login: string) {  
    return (await this.userGetOneByLogin.run(login)).toPlainObject();
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
      return (await this.userGetOneById.run(id)).toPlainObject();
    } catch (error) {
      if (error instanceof UserNotFoundError) 
      {
        throw new NotFoundException('Usuario no encontrado');
      }
      throw error;
    }
  }

  @Post()
  async create(@Body() body: Create){
    const password = await bcryptjs.hash(body.password, 10);
    await this.userCreate.run(
        body.name, 
        body.email, 
        new Date(),
        body.login,
        password,
        body.status ?? 1,
    );

    return {
      statusCode: 201,
      message: 'Usuario creado con éxito',
    };
  }

  @Post('find')
  async findUser(@Body() body: FindUser) {
    if (body.id) {
      return (await this.userGetOneById.run(body.id)).toPlainObject();
    } else if (body.email) {
      return (await this.userGetOneByEmail.run(body.email)).toPlainObject();
    } else if (body.login) {
      return (await this.userGetOneByLogin.run(body.login)).toPlainObject();
    } else {
      const message = "Debe proporcionar un id, o un email o un login";
      const error = "Solicitud incorrecta";
      throw new BaseHttpException(message, error);
    }
  }

  @Put(':id/editStatus')
  async editStatus(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number
  ) {
      await this.userEdit.editStatus(id);

      return {
          statusCode: 200,
          message: 'Usuario habilitado con éxito',
      };
  }

  @Put(':id/editNameAndLogin')
  async editNameAndLogin(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number, 
    @Body() body: { name: string, login: string }
  ) {
      await this.userEdit.editNameAndLogin(id, body.name, body.login);

      return {
          statusCode: 200,
          message: 'Nombre y login editados con éxito',
      };
  }

  @Put(':id/editEmail')
  async editEmail(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number, 
    @Body() body: { email: string }
  ) {
      await this.userEdit.editEmail(id, body.email);

      return {
          statusCode: 200,
          message: 'Correo electrónico editado con éxito',
      };
  }

  @Put(':id/editPassword')
  async editPassword(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 400 })) id: number, 
    @Body() body: { email: string, password: string }
  ) {
      await this.userEdit.editPassword(id, body.email, body.password);

      return {
          statusCode: 200,
          message: 'Contraseña editada con éxito',
      };
  }

  @Put(':id/deleteUser')
  async deleteUser(
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
    await this.userDelete.run(id);

    return {
      statusCode: 200,
      message: 'Usuario desactivado con éxito',
    };
  }
}
