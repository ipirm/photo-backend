import {Entity, Column, OneToMany, JoinColumn, JoinTable} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {ConcertsUsersEntity} from "./concerts-users.entity";

@Entity('concerts')

export abstract class ConcertsEntity extends BaseEntity {
    @Column({type: 'varchar', length: 500, nullable: false})
    title: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    description: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    startDate: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    endDate: string;

    @OneToMany(type => ConcertsUsersEntity, concertsUser => concertsUser.concert,
        {cascade: true})
    @JoinTable()
    public concertsUsers: ConcertsUsersEntity[];
}

