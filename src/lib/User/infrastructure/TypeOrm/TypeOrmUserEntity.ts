import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TypeOrmUserRoleEntity } from '@infrastructure/TypeOrm/TypeOrmUserRoleEntity';
import { Transform } from 'class-transformer';

@Entity('users')
export class TypeOrmUserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({value}) => value.trim())
    @Column({ type: 'varchar', length: 255,  nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @Transform(({value}) => value.trim())
    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    login: string;

    @Transform(({value}) => value.trim())
    @Column({ type: 'varchar', length: 255, nullable: false })    
    password: string;

    @Column({ type: 'int', default: 1 })
    status: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => TypeOrmUserRoleEntity, (userRole) => userRole.user)
    userRoles: TypeOrmUserRoleEntity[];
}