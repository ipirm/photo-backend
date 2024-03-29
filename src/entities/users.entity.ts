import {Entity, Column, OneToMany, JoinTable, BeforeInsert} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {ConcertsUsersEntity} from "./concerts-users.entity";
import {LikesEntity} from "./likes.entity";
import {PlacesEntity} from "./places.entity";

enum Roles {
    Admin = 'admin',
    User = 'user',
}

@Entity('users')

export abstract class UsersEntity extends BaseEntity {
    @Column({type: 'varchar', length: 500, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 500, nullable: true, select: false})
    full_name: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    city: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    country: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    last_name: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    gender: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    age: string;
    @Column({type: 'varchar', length: 500, nullable: false})
    email: string;
    @Column({type: 'varchar', length: 500, nullable: false, select: false})
    password: string;
    @Column({type: 'varchar', length: 500, nullable: false})
    avatar: string;
    @Column({type: 'varchar', length: 500, nullable: true, select: false})
    facebook_id: number;
    @Column({type: 'varchar', length: 500, nullable: true, select: false})
    google_id: number;
    @Column({type: 'varchar', length: 500, nullable: true, select: false})
    vk_id: number;
    @Column({type: 'money', default: 0, select: false})
    balance: string;

    @Column({type: 'boolean', default: false, select: false})
    purchased: boolean;

    @Column('enum', {enum: Roles, default: Roles.User})
    role: Roles


    @OneToMany(type => LikesEntity, like => like.user,
        {cascade: true, nullable: true})
    public likes: LikesEntity[]

    @OneToMany(type => ConcertsUsersEntity, concertsUser => concertsUser.user, {cascade: true})
    @JoinTable()
    public concertsUsers: ConcertsUsersEntity[];


    @OneToMany(type => PlacesEntity, place => place.concert, {cascade: true})
    public places?: PlacesEntity;


    @Column({type: 'boolean', default: false})
    accept_rules: boolean;
}

