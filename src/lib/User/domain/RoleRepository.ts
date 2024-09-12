import { Role } from '@domain/Role';
import { ValidateId } from '@domain/validations/ValidateId';
import { ValidateName } from '@domain/validations/ValidateName';

export interface RoleRepository {
  create(role: Role): Promise<void>;
  getAll(): Promise<Role[]>;
  getOneById(id: ValidateId): Promise<Role | null>;
  getOneByName(nameRole: ValidateName): Promise<Role | null>;
  edit(role: Role): Promise<void>;
  delete(id: ValidateId): Promise<void>;
}
