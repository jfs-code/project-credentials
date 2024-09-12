import { Role } from '@domain/Role';
import { ValidateId } from '@domain/validations/ValidateId';
import { ValidateName } from '@domain/validations/ValidateName';
import { ValidateDescription } from '@domain/validations/ValidateDescription';
import { RoleRepository } from '@domain/RoleRepository';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';
import { ValidateStatus } from '@domain/validations/ValidateStatus';

export class RoleEdit {
  constructor(private repository: RoleRepository) {}

  async run(
    id: number,
    nameRole: string,
    description: string,
    statusRole: number,
  ): Promise<void> {
    const role = await this.validateRoleExists(id);  

    new ValidateName(nameRole),
    new ValidateDescription(description),
    new ValidateStatus(statusRole),

    await this.repository.edit(role);
  }

  async editStatus(id: number): Promise<void> {
    const role = await this.validateRoleExists(id);

    role.statusRole = new ValidateStatus(1);

    await this.repository.edit(role);
  }

  async editName(id: number, nameRole: string): Promise<void> {
    const role = await this.validateRoleExists(id);

    role.nameRole = new ValidateName(nameRole);

    await this.repository.edit(role);
  }

  async editDescription(id: number, description: string): Promise<void> {
    const role = await this.validateRoleExists(id);

    role.description = new ValidateDescription(description);

    await this.repository.edit(role);
  }

  async editNameAndDescription(id: number, nameRole: string, description: string): Promise<void> {
    const role = await this.validateRoleExists(id);

    role.nameRole = new ValidateName(nameRole);
    role.description = new ValidateDescription(description);

    await this.repository.edit(role);
  }

  private async validateRoleExists(id: number): Promise<Role> {
    const role = await this.repository.getOneById(new ValidateId(id));
    
    if (!role) {
      const message = `Rol no encontrado`;
      const error = "Rol invalido";
      throw new BaseHttpException(message, error);
    }

    return role;
  }

}
