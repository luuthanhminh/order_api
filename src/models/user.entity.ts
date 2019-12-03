// item.entity.ts
import { Entity, Column, PrimaryColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity, Notification, Store, AuthenticationProvider } from './';

@Entity()
export class User extends BaseEntity {

  constructor() {
    super();
  }

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  lastName: string;

  @Column({nullable: true})
  avatar: string;

  @Column({nullable: true})
  phoneNumber: string;

  @Column({nullable: true})
  address: string;

  @Column({nullable: true})
  notificationToken: string;

  @Column({nullable: true})
  platForm: string;

  @Column({ type: 'boolean', default: false })
  isStore: boolean;

  @OneToOne(type => AuthenticationProvider, { nullable: true })
  @JoinColumn()
  provider: AuthenticationProvider;

  @OneToOne(type => Store, { nullable: true })
  @JoinColumn()
  store: Store;

  @OneToMany(type => Notification, noti => noti.user)
  notifications: Promise<Notification[]>;
}
