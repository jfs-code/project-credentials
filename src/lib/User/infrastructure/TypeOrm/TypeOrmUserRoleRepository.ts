import { Repository } from 'typeorm';
import { UserRoleRepository } from '@domain/UserRoleRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidateId } from '@domain/validations/ValidateId';
import { TypeOrmUserRoleEntity } from './TypeOrmUserRoleEntity';

import { UserRole } from '@domain/UserRole';

export class TypeOrmUserRoleRepository implements UserRoleRepository {
    constructor(

        @InjectRepository(TypeOrmUserRoleEntity)
        private readonly repository: Repository<TypeOrmUserRoleEntity>,
    ) {}

    private mapToDomain(ur: TypeOrmUserRoleEntity): UserRole {
        
        return new UserRole(             
            new ValidateId(ur.userId), 
            new ValidateId(ur.roleId),
            ur.status,
        );
    }
    
    async getAll(): Promise<UserRole[]> {
        const userRoles = await this.repository.find();
        
        return userRoles.map((r) => this.mapToDomain(r));
    }

    async getOneByUserIdAndRoleId(userId: ValidateId, roleId: ValidateId): Promise<UserRole | null> {
        const userRole = await this.repository.findOne({
            where: { 
                userId: userId.value,
                roleId: roleId.value
            },
        });
    
        return userRole ? this.mapToDomain(userRole) : null;
    }

    async create(userRole: UserRole): Promise<void> {

        const userRoleEntity = this.repository.create({
            userId: userRole.userId.value,
            roleId: userRole.roleId.value,
            status: userRole.status,            
        });

        await this.repository.save(userRoleEntity);
    }

    async edit(userRole: UserRole): Promise<void> {
        const userRoleEntity = {
            status: userRole.status,
        };

        await this.repository.update(
            { 
                userId: userRole.userId.value,
                roleId: userRole.roleId.value 
            }, 
            userRoleEntity);
    }

    async delete(userId: ValidateId, roleId: ValidateId): Promise<void> {
        const userRole = await this.repository.findOne({
            where: {
                userId: userId.value,
                roleId: roleId.value,
            },
        });
        
        if (!userRole) {
            throw new Error('El rol no fue encontrado para el usuario');
        }
    
        await this.repository.update(
            { 
                userId: userId.value, 
                roleId: roleId.value 
            },
            { 
                status: 0 
            }
        );
    }
}