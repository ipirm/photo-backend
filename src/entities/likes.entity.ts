import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {ConcertsUsersEntity} from "./concerts-users.entity";

@Entity('likes')

export abstract class LikesEntity extends BaseEntity {

    @Column({type: 'varchar', length: 500, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 500, nullable: false})
    email: string;

    // @ManyToOne(type => ConcertsUsersEntity, concertsUser => concertsUser.likes,{cascade:true})
    // public concertsUser: ConcertsUsersEntity;

}


