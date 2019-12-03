// item.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Notification extends BaseEntity {

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  message: string;

  @ManyToOne(type => User, user => user.notifications)
  user: User;
}
