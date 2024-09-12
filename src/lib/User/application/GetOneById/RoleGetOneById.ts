import { Role } from '@domain/Role';
import { ValidateId } from '@domain/validations/ValidateId';
import { RoleRepository } from '@domain/RoleRepository';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';

export class RoleGetOneById {
  constructor(private repository: RoleRepository) {}

  async run(id: number): Promise<Role> {
    const role = await this.repository.getOneById(new ValidateId(id));

    if (!role) {
      const message = "Rol no encontrado";
      const error = "Role en usuario";
      throw new BaseHttpException(message, error);
    }

    return role;
  }
}
