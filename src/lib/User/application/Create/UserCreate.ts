import { User } from '@domain/User';
import { ValidateCreatedAt } from '@domain/validations/ValidateCreatedAt';
import { ValidateEmail } from 'src/lib/User/domain/validations/ValidateEmail';
import { ValidateName } from '@domain/validations/ValidateName';
import { ValidateLogin } from '@domain/validations/ValidateLogin';
import { ValidatePassword } from '@domain/validations/ValidatePassword';
import { UserRepository } from '@domain/UserRepository';
import { ValidateStatus } from '@domain/validations/ValidateStatus';

export class UserCreate {
  constructor(private repository: UserRepository) {}

  async run(
    name: string,
    email: string,
    createdAt: Date,
    login: string,
    password: string,
    status: number
  ): Promise<void> {
    const user = new User(      
      new ValidateName(name),
      new ValidateEmail(email),
      new ValidateCreatedAt(createdAt),
      new ValidateLogin(login),
      new ValidatePassword(password),
      new ValidateStatus(status),
    );

    return this.repository.create(user);
  }
}
