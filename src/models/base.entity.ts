// base.entity.ts
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {

    constructor() {
        this.createDateTime = new Date();
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createDateTime: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    lastChangedDateTime: Date;

}
