import {Entity, Column, ManyToOne} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {ConcertsEntity} from "./concerts.entity";
import {UsersEntity} from "./users.entity";

@Entity('likes')

export abstract class LikesEntity extends BaseEntity {

    @Column({type: 'varchar', length: 500, nullable: false})
    user_id: number;

    @Column({type: 'varchar', length: 500, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 500, nullable: false})
    email: string;


    @ManyToOne(type => UsersEntity, concertsUser => concertsUser.likes)
    public user: UsersEntity;

    @Column()
    public userId: number

    @ManyToOne(type => ConcertsEntity, concertsUser => concertsUser.likes)
    public concert: UsersEntity;

    @Column()
    public concertId: number


}


