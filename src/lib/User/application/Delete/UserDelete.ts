import { ValidateId } from '@domain/validations/ValidateId';
import { ValidateStatus } from '@domain/validations/ValidateStatus';
import { UserRepository } from '@domain/UserRepository';

export class UserDelete {
  constructor(private repository: UserRepository) {}

  async run(id: number): Promise<void> {
    const user = await this.repository.getOneById(new ValidateId(id));

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    user.status = new ValidateStatus(0);

    await this.repository.delete(new ValidateId(user.getId()));
  }
}
