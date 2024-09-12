import { UserRole } from '@domain/UserRole';
import { ValidateId } from '@domain/validations/ValidateId';
import { ValidateStatus } from '@domain/validations/ValidateStatus';
import { UserRoleRepository } from '@domain/UserRoleRepository';

export class InMemoryUserRoleRepository implements UserRoleRepository {
  private userRoles: UserRole[] = [];

  async create(userRole: UserRole): Promise<void> {
    this.userRoles.push(userRole);
  }

  async getAll(): Promise<UserRole[]> {
    return this.userRoles;
  }

  async getOneByUserIdAndRoleId(userId: ValidateId, roleId: ValidateId): Promise<UserRole | null> {
    return (
      this.userRoles.find(
        (userRole) =>
          userRole.userId.value === userId.value && userRole.roleId.value === roleId.value
      ) || null
    );
  }

  async edit(userRole: UserRole): Promise<void> {
    const index = this.userRoles.findIndex(
      (u) => u.userId.value === userRole.userId.value && u.roleId.value === userRole.roleId.value
    );

    if (index !== -1) {
      this.userRoles[index].status = userRole.status;
    }
  }

  async delete(userId: ValidateId, roleId: ValidateId): Promise<void> {
    this.userRoles = this.userRoles.map((userRole) => {
      if (userRole.userId.value === userId.value && userRole.roleId.value === roleId.value) {
        userRole.status = new ValidateStatus(0).value;
      }
      return userRole;
    });
  }
}
