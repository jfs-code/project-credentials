import { ValidateId } from '@domain/validations/ValidateId';
import { UserRoleRepository } from '@domain/UserRoleRepository';

export class UserRoleDelete {
  constructor(private repository: UserRoleRepository) {}

  async run(userId: number, roleId: number): Promise<void> {
    const validatedUserId = new ValidateId(userId);
    const validatedRoleId = new ValidateId(roleId);

    const userRole = await this.repository.getOneByUserIdAndRoleId(validatedUserId, validatedRoleId);

    if (!userRole) {
      throw new Error('Rol de usuario no encontrado');
    }

    userRole.status = 0;

    await this.repository.delete(validatedUserId, validatedRoleId);
  }
}
