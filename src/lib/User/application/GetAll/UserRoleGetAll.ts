import { UserRole } from '@domain/UserRole';
import { UserRoleRepository } from '@domain/UserRoleRepository';

export class UserRoleGetAll {
  constructor(private repository: UserRoleRepository) {}

  async run(): Promise<UserRole[]> {
    const userRoles = await this.repository.getAll();
    return userRoles.filter(userRole => userRole.status === 1);
  }
}
