import { User } from '@domain/User';
import { ValidateEmail } from 'src/lib/User/domain/validations/ValidateEmail';
import { ValidateId } from '@domain/validations/ValidateId';
import { ValidateName } from '@domain/validations/ValidateName';
import { ValidateLogin } from '@domain/validations/ValidateLogin';
import { ValidatePassword } from '@domain/validations/ValidatePassword';
import { UserRepository } from '@domain/UserRepository';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';
import { ValidateStatus } from '@domain/validations/ValidateStatus';

export class UserEdit {
  constructor(private repository: UserRepository) {}

  async run(
    id: number,
    name: string,
    email: string,
    login: string,
    password: string,
    status: number,
  ): Promise<void> {
    const user = await this.validateUserExists(id);  

    new ValidateName(name),
    new ValidateEmail(email),
    new ValidateLogin(login),
    new ValidatePassword(password),
    new ValidateStatus(status),

    await this.repository.edit(user);
  }

  async editNameAndLogin(id: number, name: string, login: string): Promise<void> {
    const user = await this.validateUserExists(id);

    user.name = new ValidateName(name);
    user.login = new ValidateLogin(login);

    await this.repository.edit(user);
  }

  async editEmail(id: number, email: string): Promise<void> {
    const user = await this.validateUserExists(id);

    user.email = new ValidateEmail(email);

    await this.repository.edit(user);
  }

  async editStatus(id: number): Promise<void> {
    const user = await this.validateUserExists(id);

    user.status = new ValidateStatus(1);

    await this.repository.edit(user);
  }

  async editPassword(id: number, email: string, password: string): Promise<void> {
    const user = await this.validateUserExists(id);

    if (user.email.value !== email) {
      const message = `El correo electrónico no coincide`;
      const error = "Solicitud incorrecta";
      throw new BaseHttpException(message, error);
    }

    user.password = new ValidatePassword(password);

    await this.repository.edit(user);
  }

  private async validateUserExists(id: number): Promise<User> {
    const user = await this.repository.getOneById(new ValidateId(id));
    
    if (!user) {
      const message = `Usuario no encontrado`;
      const error = "Usuario invalido";
      throw new BaseHttpException(message, error);
    }

    return user;
  }

}
