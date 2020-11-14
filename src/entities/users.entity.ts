import {Entity, Column, OneToMany, JoinTable} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {ConcertsUsersEntity} from "./concerts-users.entity";

@Entity('users')

export abstract class UsersEntity extends BaseEntity {
    @Column({type: 'varchar', length: 500, nullable: false})
    name: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    last_name: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    gender: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    age: string;
    @Column({type: 'varchar', length: 500, nullable: false})
    email: string;
    @Column({type: 'varchar', length: 500, nullable: false})
    password: string;
    @Column({type: 'varchar', length: 500, nullable: false})
    avatar: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    facebook_id: number;

    @Column({type: 'money', default: 0})
    balance: string;

    @OneToMany(type => ConcertsUsersEntity, concertsUser => concertsUser.user, {cascade: true})
    @JoinTable()
    public concertsUsers: ConcertsUsersEntity[];
}

