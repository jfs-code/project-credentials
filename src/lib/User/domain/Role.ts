import { ValidateId } from '@domain/validations/ValidateId';
import { ValidateName } from '@domain/validations/ValidateName';
import { ValidateDescription } from '@domain/validations/ValidateDescription';
import { ValidateStatus } from '@domain/validations/ValidateStatus';

export class Role {
    id?: ValidateId;
    nameRole: ValidateName;
    description?: ValidateDescription;
    statusRole: ValidateStatus;
  
    constructor(
        nameRole: ValidateName, 
        statusRole: ValidateStatus, 
        description?: ValidateDescription, 
        id?: ValidateId
    ) {
      this.nameRole = nameRole;
      this.statusRole = statusRole;
      if (description) {
        this.description = description;
      }
      if (id) {
        this.id = id;
      }
    }
  
    public toPlainObject() {
      return {
        id: this.id?.value,
        nameRole: this.nameRole.value,
        description: this.description.value,
        statusRole: this.statusRole.value,
      };
    }

    getId(): number | undefined {
        return this.id?.value;
    }
  }
  