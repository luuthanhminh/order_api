// item.entity.ts
import { Entity, Column, PrimaryColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity, Notification, Store, AuthenticationProvider } from './';

@Entity()
export class User extends BaseEntity {

  @PrimaryColumn()
  email: string;

  @Column({ type: 'varchar', length: 300 })
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  lastName: string;

  @Column()
  avatar: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  notificationToken: string;

  @Column()
  platForm: string;

  @Column({ type: 'boolean', default: false })
  isStore: boolean;

  @OneToOne(type => AuthenticationProvider)
  @JoinColumn()
  provider: AuthenticationProvider;

  @OneToOne(type => Store)
  @JoinColumn()
  store: Store;

  @OneToMany(type => Notification, noti => noti.user)
  notifications: Promise<Notification[]>;
}
