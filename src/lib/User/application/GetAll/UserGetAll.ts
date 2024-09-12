import { User } from '@domain/User';
import { UserRepository } from '@domain/UserRepository';

export class UserGetAll {
  constructor(private repository: UserRepository) {}

  async run(): Promise<User[]> {
    const users = await this.repository.getAll();
    return users.filter(user => user.status.value === 1);
  }
}
