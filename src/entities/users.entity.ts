import {Entity, Column} from 'typeorm'
import {BaseEntity} from "./base.entity";

@Entity('users')

export abstract class UsersEntity extends BaseEntity {
    @Column({type: 'varchar', length: 500, nullable: false})
    name: string;
    @Column({type: 'varchar', length: 500, nullable: false})
    email: string;
    @Column({type: 'varchar', length: 500, nullable: false})
    password: string;
}

