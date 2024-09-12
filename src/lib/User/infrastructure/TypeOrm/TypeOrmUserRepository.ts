import { Repository } from 'typeorm';
import { UserRepository } from '@domain/UserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@domain/User';
import { ValidateId } from '@domain/validations/ValidateId';
import { TypeOrmUserEntity } from './TypeOrmUserEntity';
import { ValidateName } from '@domain/validations/ValidateName';
import { ValidateEmail } from '@domain/validations/ValidateEmail';
import { ValidateCreatedAt } from '@domain/validations/ValidateCreatedAt';
import { ValidateUpdatedAt } from '@domain/validations/ValidateUpdatedAt';
import { ValidateLogin } from '@domain/validations/ValidateLogin';
import { ValidatePassword } from '@domain/validations/ValidatePassword';
import { ValidateStatus } from '@domain/validations/ValidateStatus';

export class TypeOrmUserRepository implements UserRepository {
    constructor(
        @InjectRepository(TypeOrmUserEntity)
        private readonly repository: Repository<TypeOrmUserEntity>,
    ) {}

    private mapToDomain(u: TypeOrmUserEntity): User {
        
        return new User(             
            new ValidateName(u.name), 
            new ValidateEmail(u.email), 
            new ValidateCreatedAt(u.createdAt),
            new ValidateLogin(u.login), 
            new ValidatePassword(u.password),
            new ValidateStatus(u.status),
            new ValidateId(u.id),
            u.updatedAt ? new ValidateUpdatedAt(u.updatedAt) : undefined, 
        );
    }
    
    async getAll(): Promise<User[]> {
        const users = await this.repository.find();
        
        return users.map((u) => this.mapToDomain(u));
    }

    async getOneById(id: ValidateId): Promise<User | null> {
        const user = await this.repository.findOne({
            where: { id: id.value },
        });

        return user ? this.mapToDomain(user) : null;
    }

    async getOneByEmail(email: ValidateEmail): Promise<User | null> {
        const user = await this.repository.findOne({
          where: { email: email.value },
        });
        
        return user ? this.mapToDomain(user) : null;
    }

    async getOneByLogin(login: ValidateLogin): Promise<User | null> {
        const user = await this.repository.findOne({
          where: { login: login.value },
        });
        
        return user ? this.mapToDomain(user) : null;
    }

    async create(user: User): Promise<void> {

        const userEntity = this.repository.create({
            name: user.name.value,
            email: user.email.value,
            createdAt: user.createdAt.value,
            login: user.login.value,
            password: user.password.value,
            status: user.status.value,
        });

        await this.repository.save(userEntity);
    }

    async edit(user: User): Promise<void> {
        const userEntity = {
            name: user.name.value,
            email: user.email.value,
            login: user.login.value,
            password: user.password.value,
            status: user.status.value,
            updatedAt: new Date()
        };

        await this.repository.update(user.getId(), userEntity);
    }

    async delete(id: ValidateId): Promise<void> {
        const user = await this.repository.findOne({
            where: { id: id.value },
        });
        
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        await this.repository.update(id.value, {
            status: 0,
        });
    }
}