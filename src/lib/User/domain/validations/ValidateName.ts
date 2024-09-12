import { BaseHttpException } from '../exceptions/Base-Http-Exception';

export class ValidateName {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length < 3) {
      const message = `El nombre debe tener al menos 3 caracteres`;
      const error = "Invalido Nombre";
      throw new BaseHttpException(message, error);
    }
  }
}
