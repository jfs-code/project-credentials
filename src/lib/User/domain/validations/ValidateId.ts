import { BaseHttpException } from '../exceptions/Base-Http-Exception';

export class ValidateId {
  value: number;

  constructor(value: number) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value !== undefined && this.value <= 0) {
      const message = `El id debe ser un número positivo.`;
      const error = "Invalido Id";
      throw new BaseHttpException(message, error);
    }
  }
}
