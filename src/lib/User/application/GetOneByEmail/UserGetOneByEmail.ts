import { User } from '@domain/User';
import { ValidateEmail } from 'src/lib/User/domain/validations/ValidateEmail';
import { UserRepository } from '@domain/UserRepository';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';

export class UserGetOneByEmail {
  constructor(private repository: UserRepository) {}

  async run(email: string): Promise<User> {
    const user = await this.repository.getOneByEmail(new ValidateEmail(email));
    
    if (!user) {
      const message = "Correo electrónico no encontrado";
      const error = "Error en correo electrónico ";
      throw new BaseHttpException(message, error);
    }

    return user;
  }
}
