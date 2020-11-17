import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {UsersEntity} from "./users.entity";
import {ConcertsEntity} from "./concerts.entity";


@Entity('concerts_users')

export abstract class ConcertsUsersEntity extends BaseEntity {

    @Column({type: 'boolean', default: false})
    voice: boolean;

    @Column({type: 'boolean', default: false})
    approve: boolean;

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

    @Column('json', { default: null })
    images: { url: string, name: string }[]


}

