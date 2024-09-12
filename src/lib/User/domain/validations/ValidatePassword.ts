import { BaseHttpException } from '../exceptions/Base-Http-Exception';

export class ValidatePassword {
    value: string;
  
    constructor(value: string) {
      this.value = value;
      this.ensureIsValid();
    }
  
    private ensureIsValid() {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(this.value);
      const hasLowerCase = /[a-z]/.test(this.value);
      const hasNumber = /\d/.test(this.value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.value);
  
      if (this.value.length < minLength) {
        const message = `La contraseña debe tener al menos ${minLength} caracteres`;
        const error = "Contraseña demasiado corta";
        throw new BaseHttpException(message, error);
      }
  
      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        const message = 'La contraseña de usuario debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.';
        const error = 'Contraseña invalida';
        throw new BaseHttpException(message, error);
      }
    }
  }
  