// item.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Notification extends BaseEntity {

  @Column()
  title: string;

  @Column()
  message: string;

  @ManyToOne(type => User, user => user.notifications)
  user: User;
}
