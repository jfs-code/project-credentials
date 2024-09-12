import { UserRole } from '@domain/UserRole';
import { ValidateId } from '@domain/validations/ValidateId';
import { UserRoleRepository } from '@domain/UserRoleRepository';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';
import { ValidateStatus } from '@domain/validations/ValidateStatus';

export class UserRoleEdit {
  constructor(private repository: UserRoleRepository) {}

  async run(
    userId: number,
    roleId: number,
    status: number,
  ): Promise<void> {
    new ValidateId(userId);
    new ValidateId(roleId);
    new ValidateStatus(status);

    const userRole = await this.validateRoleExists(userId, roleId);  

    userRole.status = status;

    await this.repository.edit(userRole);
  }

  async editStatus(userId: number, roleId: number): Promise<void> {
    new ValidateId(userId);
    new ValidateId(roleId);

    const userRole = await this.validateRoleExists(userId, roleId); 

    userRole.status = 1;

    await this.repository.edit(userRole);
  }

  async editUser(userId: number, roleId: number, newUserId:number): Promise<void> {
    new ValidateId(userId);
    new ValidateId(roleId);
    new ValidateId(newUserId);

    const userRole = await this.validateRoleExists(userId, roleId); 

    userRole.userId = new ValidateId(newUserId);

    await this.repository.edit(userRole);
  }

  async editRole(userId: number, roleId: number, newRoleId:number): Promise<void> {
    new ValidateId(userId);
    new ValidateId(roleId);
    new ValidateId(newRoleId);

    const userRole = await this.validateRoleExists(userId, roleId); 

    userRole.roleId = new ValidateId(newRoleId);

    await this.repository.edit(userRole);
  }

  private async validateRoleExists(userId: number, roleId: number): Promise<UserRole> {
    const validatedUserId = new ValidateId(userId);
    const validatedRoleId = new ValidateId(roleId);

    const userRole = await this.repository.getOneByUserIdAndRoleId(validatedUserId, validatedRoleId);

    if (!userRole) {
      const message = `Rol o usuario no encontrado`;
      const error = "Rol o usuario invalido";
      throw new BaseHttpException(message, error);
    }

    return userRole;
  }
}

