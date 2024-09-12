import { Role } from '@domain/Role';
import { ValidateId } from '@domain/validations/ValidateId';
import { ValidateName } from '@domain/validations/ValidateName';
import { ValidateStatus } from '@domain/validations/ValidateStatus';
import { RoleRepository } from '@domain/RoleRepository';

export class InMemoryRoleRepository implements RoleRepository {
  private roles: Role[] = [];

  async create(role: Role): Promise<void> {
    this.roles.push(role);
  }

  async getAll(): Promise<Role[]> {
    return this.roles;
  }

  async getOneById(id: ValidateId): Promise<Role | null> {
    return this.roles.find((role) => role.id.value === id.value) || null;
  }

  async getOneByName(nameRole: ValidateName): Promise<Role | null> {
    return this.roles.find((role) => role.nameRole.value === nameRole.value) || null;
  }

  async edit(role: Role): Promise<void> {
    const index = this.roles.findIndex((u) => u.id.value == role.id.value);
    this.roles[index] = role;
  }

  async delete(id: ValidateId): Promise<void> {
    this.roles = this.roles.map((role) => {
      if (role.id.value === id.value) {
        role.statusRole = new ValidateStatus(0);
      }
      return role;
    });
  }
}
