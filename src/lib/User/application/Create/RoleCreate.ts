import { Role } from '@domain/Role';
import { ValidateName } from '@domain/validations/ValidateName';
import { ValidateDescription } from '@domain/validations/ValidateDescription';
import { RoleRepository } from '@domain/RoleRepository';
import { ValidateStatus } from '@domain/validations/ValidateStatus';

export class RoleCreate {
  constructor(private repository: RoleRepository) {}

  async run(
    nameRole: string,
    description: string,
    statusRole: number
  ): Promise<void> {
    const role = new Role(      
      new ValidateName(nameRole),
      new ValidateStatus(statusRole),
      new ValidateDescription(description),
      
    );

    return this.repository.create(role);
  }
}
