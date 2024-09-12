import { BaseHttpException } from '../exceptions/Base-Http-Exception';

export class ValidateStatus {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (![0, 1].includes(this.value)) {
      const message = `El estado del usuario debe ser 1 (activo) o 0 (inactivo)`;
      const error = "Estado de Usuario Inválido";
      throw new BaseHttpException(message, error);
    }
  }
}