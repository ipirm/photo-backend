import {Entity, Column, OneToMany, JoinTable} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {ConcertsUsersEntity} from "./concerts-users.entity";
import {LikesEntity} from "./likes.entity";
import {DefaultLocale, SupportedLocales} from "../locale/locale";
import {I18nColumn} from "typeorm-i18n";
import {PlacesEntity} from "./places.entity";

@Entity('concerts')

export abstract class ConcertsEntity extends BaseEntity {

    @I18nColumn({
        default_language: DefaultLocale,
        languages: SupportedLocales,
    })
    @Column({type: 'varchar', length: 500, nullable: false})
    title: string;

    @I18nColumn({
        default_language: DefaultLocale,
        languages: SupportedLocales,
    })
    @Column({type: 'varchar', length: 500, nullable: true})
    description: string;


    @Column({type: 'varchar', length: 500, nullable: true})
    startDate: string;
    @Column({type: 'varchar', length: 500, nullable: true})
    endDate: string;

    @Column({type: 'int', default: 0})
    total: number;

    @OneToMany(type => ConcertsUsersEntity, concertsUser => concertsUser.concert,
        {cascade: true})
    @JoinTable()
    public concertsUsers: ConcertsUsersEntity[];

    @OneToMany(type => LikesEntity, like => like.concert,
        {cascade: true})
    public likes: LikesEntity[]

    @OneToMany(type => PlacesEntity, place => place.concert,
        {cascade: true})
    public places: PlacesEntity[]

}

