import {Entity, Column, ManyToOne} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {UsersEntity} from "./users.entity";
import {ConcertsEntity} from "./concerts.entity";


@Entity('concerts_users')

export abstract class ConcertsUsersEntity extends BaseEntity {

    @Column({type: 'boolean', default: false})
    voice: boolean;

    @ManyToOne(type => UsersEntity, user => user.concertsUsers, {primary: true})
    public user: UsersEntity;

    @ManyToOne(type => ConcertsEntity, concert => concert.concertsUsers, {primary: true})
    public concert: ConcertsEntity;
}

