// item.entity.ts
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Food } from './food.entity';

@Entity()
export class Store extends BaseEntity {

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @OneToMany(type => Food, food => food.store)
  foods: Promise<Food[]>;
}
