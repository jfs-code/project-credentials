import { ValidateId } from '@domain/validations/ValidateId';
import { ValidateStatus } from '@domain/validations/ValidateStatus';
import { RoleRepository } from '@domain/RoleRepository';

export class RoleDelete {
  constructor(private repository: RoleRepository) {}

  async run(id: number): Promise<void> {
    const role = await this.repository.getOneById(new ValidateId(id));

    if (!role) {
      throw new Error('Rol no encontrado');
    }

    role.statusRole = new ValidateStatus(0);

    await this.repository.delete(new ValidateId(role.getId()));
  }
}
