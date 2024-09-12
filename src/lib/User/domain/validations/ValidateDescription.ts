import { BaseHttpException } from '@domain/exceptions/Base-Http-Exception';

export class ValidateDescription {
  value: string;

  constructor(value: string | null | undefined) {
    this.value = value || '';
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value !== null && this.value !== undefined) {      
      if (this.value.length > 1000) {
        const message = `La descripción no debe exceder los 1000 caracteres`;
        const error = "Descripción Inválida";
        throw new BaseHttpException(message, error);
      }
    }
  }
}

