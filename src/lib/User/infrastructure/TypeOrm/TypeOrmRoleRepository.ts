import { Repository } from 'typeorm';
import { RoleRepository } from '@domain/RoleRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidateId } from '@domain/validations/ValidateId';
import { TypeOrmRoleEntity } from './TypeOrmRoleEntity';
import { ValidateName } from '@domain/validations/ValidateName';
import { ValidateDescription } from '@domain/validations/ValidateDescription';
import { ValidateStatus } from '@domain/validations/ValidateStatus';

import { Role } from '@domain/Role';

export class TypeOrmRoleRepository implements RoleRepository {
    constructor(

        @InjectRepository(TypeOrmRoleEntity)
        private readonly repository: Repository<TypeOrmRoleEntity>,
    ) {}

    private mapToDomain(r: TypeOrmRoleEntity): Role {
        
        return new Role(             
            new ValidateName(r.nameRole), 
            new ValidateStatus(r.statusRole),
            new ValidateDescription(r.description),            
            new ValidateId(r.id)
        );
    }
    
    async getAll(): Promise<Role[]> {
        const roles = await this.repository.find({ relations: ['role'] });
        
        return roles.map((r) => this.mapToDomain(r));
    }

    async getOneById(id: ValidateId): Promise<Role | null> {
        const role = await this.repository.findOne({
            where: { id: id.value },
        });

        return role ? this.mapToDomain(role) : null;
    }

    async getOneByName(nameRole: ValidateName): Promise<Role | null> {
        const role = await this.repository.findOne({
          where: { nameRole: nameRole.value },
        });
        
        return role ? this.mapToDomain(role) : null;
    }

    async create(role: Role): Promise<void> {

        const roleEntity = this.repository.create({
            nameRole: role.nameRole.value,
            description: role.description.value,
            statusRole: role.statusRole.value,            
        });

        await this.repository.save(roleEntity);
    }

    async edit(role: Role): Promise<void> {
        const roleEntity = {
            nameRole: role.nameRole.value,
            description: role.description.value,
            statusRole: role.statusRole.value,
        };

        await this.repository.update(role.getId(), roleEntity);
    }

    async delete(id: ValidateId): Promise<void> {
        const role = await this.repository.findOne({
            where: { id: id.value },
        });
        
        if (!role) {
            throw new Error('El rol no es encontrado');
        }

        await this.repository.update(id.value, {
            statusRole: 0,
        });
    }
}