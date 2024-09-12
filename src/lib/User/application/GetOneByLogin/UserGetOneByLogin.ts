import { User } from '@domain/User';
import { ValidateLogin } from '@domain/validations/ValidateLogin';
import { UserRepository } from '@domain/UserRepository';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';

export class UserGetOneByLogin {
  constructor(private repository: UserRepository) {}

  async run(login: string): Promise<User> {
    const user = await this.repository.getOneByLogin(new ValidateLogin(login));
    
    if (!user) {
      const message = "login no encontrado";
      const error = "Error en login ";
      throw new BaseHttpException(message, error);
    }

    return user;
  }
}