import { User } from '@domain/User';
import { ValidateId } from '@domain/validations/ValidateId';
import { ValidateEmail } from '@domain/validations/ValidateEmail';
import { ValidateLogin } from '@domain/validations/ValidateLogin';

export interface UserRepository {
  create(user: User): Promise<void>;
  getAll(): Promise<User[]>;
  getOneById(id: ValidateId): Promise<User | null>;
  getOneByEmail(email: ValidateEmail): Promise<User | null>;
  getOneByLogin(login: ValidateLogin): Promise<User | null>;
  edit(user: User): Promise<void>;
  delete(id: ValidateId): Promise<void>;
}
