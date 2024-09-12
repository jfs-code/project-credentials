import { BaseHttpException } from '../exceptions/Base-Http-Exception';

export class ValidateLogin {
    value: string;
  
    constructor(value: string) {
      this.value = value;
      this.ensureIsValid();
    }
  
    private ensureIsValid() {
      const minLength = 4;
      const maxLength = 20;
      const validChars = /^[a-zA-Z0-9._-]+$/;
  
      if (this.value.length < minLength || this.value.length > maxLength) {
        const message = `El login debe tener entre ${minLength} y ${maxLength} caracteres`;
        const error = "Invalido Longitud Login";
        throw new BaseHttpException(message, error);
      }
  
      if (!validChars.test(this.value)) {
        const message = `El Login contiene caracteres no válidos`;
        const error = "Invalido Login";
        throw new BaseHttpException(message, error);
      }
    }
  }