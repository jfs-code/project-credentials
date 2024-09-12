import { User } from '@domain/User';
import { ValidateId } from '@domain/validations/ValidateId';
import { UserRepository } from '@domain/UserRepository';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';

export class UserGetOneById {
  constructor(private repository: UserRepository) {}

  async run(id: number): Promise<User> {
    const user = await this.repository.getOneById(new ValidateId(id));

    if (!user) {
      const message = "Usuario no encontrado";
      const error = "Error en usuario";
      throw new BaseHttpException(message, error);
    }

    return user;
  }
}
