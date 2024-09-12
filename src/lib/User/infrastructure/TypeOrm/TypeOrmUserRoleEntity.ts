import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { TypeOrmUserEntity } from './TypeOrmUserEntity';
import { TypeOrmRoleEntity } from './TypeOrmRoleEntity';

@Entity('userRoles')
export class TypeOrmUserRoleEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  roleId: number;

  @Column({ type: 'int', default: 1 })
  status: number;

  @ManyToOne(() => TypeOrmUserEntity, (user) => user.userRoles,)
  @JoinColumn({ name: 'userId' })
  user: TypeOrmUserEntity;

  @ManyToOne(() => TypeOrmRoleEntity, (role) => role.userRoles,)
  @JoinColumn({ name: 'roleId' })
  role: TypeOrmRoleEntity;
}
