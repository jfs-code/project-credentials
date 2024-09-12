import { Role } from '@domain/Role';
import { ValidateName } from 'src/lib/User/domain/validations/ValidateName';
import { RoleRepository } from '@domain/RoleRepository';
import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';

export class RoleGetOneByName {
  constructor(private repository: RoleRepository) {}

  async run(nameRole: string): Promise<Role> {
    const role = await this.repository.getOneByName(new ValidateName(nameRole));
    
    if (!role) {
      const message = "Rol no encontrado";
      const error = "Error en rol ";
      throw new BaseHttpException(message, error);
    }

    return role;
  }
}
