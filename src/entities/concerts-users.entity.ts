import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {UsersEntity} from "./users.entity";
import {ConcertsEntity} from "./concerts.entity";

@Entity('concerts_users')

export abstract class ConcertsUsersEntity extends BaseEntity {

    @Column({type: 'boolean', default: false})
    approve: boolean;

    @Column({type: 'int', default: 0})
    likesCount: number;

    @ManyToOne(type => UsersEntity, user => user.concertsUsers, {primary: true})
    @JoinColumn({name: 'userId'})
    public user: UsersEntity;

    @ManyToOne(type => ConcertsEntity, concert => concert.concertsUsers, {primary: true})
    @JoinColumn({name: 'concertId'})
    public concert: ConcertsEntity;

    @Column()
    public userId: number;

    @Column()
    public concertId: number;

    @Column('simple-json', {default: null})
    images: { key: string, url: string }[]

}

