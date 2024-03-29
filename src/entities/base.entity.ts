import {BeforeUpdate, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export class BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({nullable: true})
    createdAt?: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt?: Date

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date;
    }
}