import { ValidateId } from './validations/ValidateId';

export class UserRole {
    userId: ValidateId;
    roleId: ValidateId;
    status: number;
  
    constructor(
      userId: ValidateId, 
      roleId: ValidateId, 
      status: number,
    ) {
      this.userId = userId;
      this.roleId = roleId;
      this.status = status;
    }
  
    toPlainObject() {
      return {
        userId: this.userId.value,
        roleId: this.roleId.value,
        status: this.status,
      };
    }
  }
  