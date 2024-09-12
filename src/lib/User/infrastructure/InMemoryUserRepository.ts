import { User } from '@domain/User';
import { ValidateId } from '@domain/validations/ValidateId';
import { ValidateEmail } from '@domain/validations/ValidateEmail';
import { ValidateLogin } from '@domain/validations/ValidateLogin';
import { ValidateStatus } from '@domain/validations/ValidateStatus';
import { UserRepository } from '@domain/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getOneById(id: ValidateId): Promise<User | null> {
    return this.users.find((user) => user.id.value === id.value) || null;
  }

  async getOneByEmail(email: ValidateEmail): Promise<User | null> {
    return this.users.find((user) => user.email.value === email.value) || null;
  }

  async getOneByLogin(login: ValidateLogin): Promise<User | null> {
    return this.users.find((user) => user.login.value === login.value) || null;
  }

  async edit(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id.value == user.id.value);
    this.users[index] = user;
  }

  async delete(id: ValidateId): Promise<void> {
    this.users = this.users.map((user) => {
      if (user.id.value === id.value) {
        user.status = new ValidateStatus(0);
      }
      return user;
    });
  }
}
