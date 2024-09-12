import { UserRole } from '@domain/UserRole';
import { ValidateId } from '@domain/validations/ValidateId';
import { UserRoleRepository } from '@domain/UserRoleRepository';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';

export class UserRoleGetOneByUserIdAndRoleId {
  constructor(private repository: UserRoleRepository) {}

  async run(userId: number, roleId: number): Promise<UserRole> {
    const validatedUserId = new ValidateId(userId);
    const validatedRoleId = new ValidateId(roleId);

    const userRole = await this.repository.getOneByUserIdAndRoleId(validatedUserId, validatedRoleId);

    if (!userRole) {
      const message = "Rol de usuario no encontrado";
      const error = "Error en la búsqueda del rol de usuario";
      throw new BaseHttpException(message, error);
    }

    return userRole;
  }
}
