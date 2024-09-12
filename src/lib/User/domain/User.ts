import { ValidateCreatedAt } from './validations/ValidateCreatedAt';
import { ValidateEmail } from './validations/ValidateEmail';
import { ValidateId } from './validations/ValidateId';
import { ValidateName } from './validations/ValidateName';
import { ValidateLogin } from './validations/ValidateLogin';
import { ValidatePassword } from './validations/ValidatePassword';
import { ValidateStatus } from './validations/ValidateStatus';
import { ValidateUpdatedAt } from './validations/ValidateUpdatedAt';

export class User {
  id?: ValidateId;
  name: ValidateName;
  email: ValidateEmail;
  createdAt: ValidateCreatedAt;
  login: ValidateLogin;
  password: ValidatePassword;
  status: ValidateStatus;
  updatedAt?: ValidateUpdatedAt;

  constructor(       
    name: ValidateName,
    email: ValidateEmail,
    createdAt: ValidateCreatedAt,
    login: ValidateLogin,
    password: ValidatePassword,
    status: ValidateStatus,
    id?: ValidateId, 
    updatedAt?: ValidateUpdatedAt,
  ) {
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.login = login;
    this.password = password;
    this.status = status;
    if (id) {
      this.id = id;
    }
    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
  }

  public nameAndEmail() {
    return `${this.name.value} - ${this.email.value}`;
  }

  public toPlainObject(){
    return {
      id:  this.id?.value,
      name: this.name.value,
      email: this.email.value,
      createdAt: this.createdAt.value,
      login: this.login.value,
      password: this.password.value,
      status: this.status.value,
      updatedAt: this.updatedAt?.value,
    };
  }

  getId(): number | undefined {
    return this.id?.value;
  }
}

