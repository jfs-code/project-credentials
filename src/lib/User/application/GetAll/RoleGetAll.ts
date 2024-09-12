import { Role } from '@domain/Role';
import { RoleRepository } from '@domain/RoleRepository';

export class RoleGetAll {
  constructor(private repository: RoleRepository) {}

  async run(): Promise<Role[]> {
    const roles = await this.repository.getAll();
    return roles.filter(role => role.statusRole.value === 1);
  }
}
