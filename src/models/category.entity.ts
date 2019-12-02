// item.entity.ts
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../models';
import { Food } from './food.entity';

@Entity()
export class Category extends BaseEntity {

  @PrimaryColumn()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @OneToMany(type => Food, food => food.category)
  foods: Promise<Food[]>;
}
