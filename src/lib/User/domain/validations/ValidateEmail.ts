import { BaseHttpException } from '../exceptions/Base-Http-Exception';

export class ValidateEmail {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!this.value.includes('@') || !this.value.includes('.')) {
      const message = `El email debe ser una dirección de correo electrónico válida. Ejemplo: nombreUsuario@dominio.com`;
      const error = "Invalid Email";
      throw new BaseHttpException(message, error);
    }
  }
}
