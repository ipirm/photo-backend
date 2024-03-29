import {Entity, Column, ManyToOne} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {ConcertsEntity} from "./concerts.entity";
import {I18nColumn} from "typeorm-i18n";
import {DefaultLocale, SupportedLocales} from "../locale/locale";
import {UsersEntity} from "./users.entity";


@Entity('places')

export abstract class PlacesEntity extends BaseEntity {

    @I18nColumn({
        default_language: DefaultLocale,
        languages: SupportedLocales,
    })
    @Column({type: 'varchar', length: 500, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 500, nullable: false})
    total: number;

    @ManyToOne(type => ConcertsEntity, concertsUser => concertsUser.places)
    public concert: ConcertsEntity;

    @ManyToOne(type => UsersEntity, concertsUser => concertsUser.places)
    public user?: ConcertsEntity;

    @Column()
    public concertId: number


}


