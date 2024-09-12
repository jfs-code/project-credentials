import { UserRole } from '@domain/UserRole';
import { ValidateId } from '@domain/validations/ValidateId';
import { UserRoleRepository } from '@domain/UserRoleRepository';
import { ValidateStatus } from '@domain/validations/ValidateStatus';

export class UserRoleCreate {
  constructor(private repository: UserRoleRepository) {}

  async run(
    userId: number,
    roleId: number,    
    status: number,
  ): Promise<void> {
    
    const validatedUserId = new ValidateId(userId);
    const validatedRoleId = new ValidateId(roleId);
    const validatedStatus = new ValidateStatus(status);

    const userRole = new UserRole(      
      validatedUserId,
      validatedRoleId,
      validatedStatus.value,
    );

    return this.repository.create(userRole);
  }
}
