import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TypeOrmUserRoleEntity } from '@infrastructure/TypeOrm/TypeOrmUserRoleEntity';
import { Transform } from 'class-transformer';

@Entity('roles')
export class TypeOrmRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({value}) => value.trim())
  @Column({ type: 'varchar', length: 80, unique: true, nullable: false })
  nameRole: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int', default: 1 })
  statusRole: number;

  @OneToMany(() => TypeOrmUserRoleEntity, (userRole) => userRole.role)
  userRoles: TypeOrmUserRoleEntity[];
}

