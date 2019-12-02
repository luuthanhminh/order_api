// item.entity.ts
import { Entity, Column, PrimaryColumn, Long, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { Store } from './store.entity';

@Entity()
export class Food extends BaseEntity {

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'bigint' })
  price: Long;

  @Column()
  imageUrl: string;

  @ManyToOne(type => Category, category => category.foods)
  category: Category;

  @ManyToOne(type => Store, store => store.foods)
  store: Store;
}
