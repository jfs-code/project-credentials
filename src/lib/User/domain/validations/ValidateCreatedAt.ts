import { BaseHttpException } from '../exceptions/Base-Http-Exception';

export class ValidateCreatedAt {
  value: Date;

  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (!(this.value instanceof Date) || isNaN(this.value.getTime())) {
      const message = `Fecha de creación no válida`;
      const error = "Fecha invalida";
      throw new BaseHttpException(message, error);
    }
  }
}
