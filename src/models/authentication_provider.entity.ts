// item.entity.ts
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class AuthenticationProvider extends BaseEntity {

  @Column()
  providerKey: string;

  @Column()
  providerType: string;

}
