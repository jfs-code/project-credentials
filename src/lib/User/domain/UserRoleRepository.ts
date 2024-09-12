import { UserRole } from '@domain/UserRole';
import { ValidateId } from '@domain/validations/ValidateId';

export interface UserRoleRepository {
  create(userRole: UserRole): Promise<void>;
  getAll(): Promise<UserRole[]>;
  getOneByUserIdAndRoleId(userId: ValidateId, roleId: ValidateId): Promise<UserRole | null>;
  edit(userRole: UserRole): Promise<void>;
  delete(userId: ValidateId, roleId: ValidateId): Promise<void>;
}
