import { BaseHttpException } from '../exceptions/Base-Http-Exception';
import { Role } from '../Role';

export class ValidateRole {
  role: Role;

  constructor(role: Role) {
    this.role = role;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    // Validación de la existencia del objeto Role
    if (!this.role) {
      throw new BaseHttpException('El rol es requerido', 'Rol Requerido');
    }

    // Validación del estado del rol
    if (this.role.statusRole.value !== 1) {
      throw new BaseHttpException('El rol no es válido o no está activo', 'Rol Invalido');
    }

    // Validación del nombre del rol (opcional)
    if (!this.role.nameRole || this.role.nameRole.value.trim() === '') {
      throw new BaseHttpException('El nombre del rol es requerido', 'Nombre de Rol Requerido');
    }

    // Validación del ID del rol (opcional)
    if (!this.role.getId()) {
      throw new BaseHttpException('El ID del rol es requerido', 'ID de Rol Requerido');
    }
  }
}

