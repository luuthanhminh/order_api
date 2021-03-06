// item.entity.ts
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Food } from './food.entity';

@Entity()
export class Store extends BaseEntity {

  @Column()
  name: string;

  @Column()
  deliveryId: number;

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  address: string;

  @Column({nullable: true})
  photos: string;

  @Column({nullable: true})
  imageUrl: string;

  @OneToMany(type => Food, food => food.store)
  foods: Promise<Food[]>;
}
