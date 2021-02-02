import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ConcertsEntity} from "../entities/concerts.entity";
import {Repository} from "typeorm";
import {UpdateConcertDto} from "./dto/update-concert-dto";
import {CreateConcertDto} from "./dto/create-concert-dto";
import {ConcertsUsersEntity} from "../entities/concerts-users.entity";
import {paginate} from "nestjs-typeorm-paginate";
import {I18nRepository} from "typeorm-i18n";
import {LikesEntity} from "../entities/likes.entity";
import {AprroveConcertDto} from "./dto/aprrove-concert-dto";

@Injectable()
export class ConcertService {
    constructor(
        @InjectRepository(ConcertsEntity) private readonly concert: I18nRepository<ConcertsEntity>,
        @InjectRepository(ConcertsUsersEntity) private readonly concert_users: Repository<ConcertsUsersEntity>,
        @InjectRepository(LikesEntity) private readonly likes: Repository<LikesEntity>,
    ) {
    }

    //  Получить все концерты
    async getAllConcerts(with_users): Promise<any> {
        if (with_users)
            return await this.concert.find({relations: ["concertsUsers"], order: {id: "ASC"}});

        return await this.concert.find({order: {id: "ASC"}})
    }

    //  Получить концерты в завиисмости от того авторизирован юзер или нет
    async findConcertUsers({id, page, limit, user, sort_by, linkID}): Promise<any> {
        let firstConcerts: any = [];
        // Получить учатника по прямой ссылке
        const linkItem = await this.concert_users.createQueryBuilder('concertUsers')
            .where("concertUsers.concertId = :concertId", {concertId: id})
            .andWhere("concertUsers.approve = :approve", {approve: true})
            .andWhere("concertUsers.userId = :userId", {userId: linkID})
            .leftJoinAndSelect("concertUsers.user", "user")
            .leftJoinAndSelect("user.likes", "likes", "likes.concertId = :concertId OR likes IS NULL", {concertId: id})
            .orderBy('concertUsers.likesCount', 'DESC')
            .getOne()

        //  Получить количество участников
        let participations = await this.concert_users.createQueryBuilder('concertUsers')
            .where("concertUsers.concertId = :concertId", {concertId: id})
            .andWhere("concertUsers.approve = :approve", {approve: true})
            .getCount()

        //  Получить количество лайков
        let likes = await this.likes.createQueryBuilder('likes')
            .where("likes.concertId = :concertId", {concertId: id})
            .andWhere("concertUsers.approve = :approve", {approve: true})
            .getCount()

        //  Query для получения пользователей концертаA

        const data = await this.concert_users.createQueryBuilder('concertUsers')
            .where("concertUsers.concertId = :concertId", {concertId: id})
            .andWhere("concertUsers.approve = :approve", {approve: true})
            .leftJoinAndSelect("concertUsers.user", "user")
            .leftJoinAndSelect("user.likes", "likes", "likes.concertId = :concertId OR likes IS NULL", {concertId: id})
            .orderBy('concertUsers.likesCount', 'DESC')

        if (sort_by === 'likes') {
            data.orderBy('concertUsers.likesCount', 'DESC')
        }
        if (sort_by === 'date') {
            data.orderBy('concertUsers.createdAt', 'DESC')
        }


        if (user) {
            // Найти пользователя который учавствует в концерте
            const userConcert = await this.concert_users.findOne({where: {userId: user.id, concertId: id}})


            // Добавить вначало участинка за которого проголосовал пользователь и кого он лайкнул
            const checkIds = [userConcert].filter(v => v !== undefined).map(v => v.id)

            if (sort_by === 'user_likes') {
                data.where("likes.user_id = :user_id", {user_id: user.id})
                return {
                    likes, participations, firstConcerts, ...await paginate<ConcertsUsersEntity>(data, {
                        page,
                        limit
                    })
                }
            }
            if (checkIds.length) {
                let leaders = await this.concert_users.createQueryBuilder('concertUsers')
                    .where("concertUsers.concertId = :concertId", {concertId: id})
                    .andWhere("concertUsers.approve = :approve", {approve: true})
                    .andWhere("concertUsers.id NOT IN (:...ids)  AND concertUsers.userId NOT IN (:...links)",
                        {ids: [...checkIds], links: [linkID]})
                    .leftJoinAndSelect("concertUsers.user", "user")
                    .leftJoinAndSelect("user.likes", "likes", "likes.concertId = :concertId OR likes IS NULL", {concertId: id})
                    .orderBy('concertUsers.likesCount', 'DESC')
                    .take(3)
                    .getMany()


                data.andWhere("concertUsers.id NOT IN (:...ids) AND concertUsers.userId NOT IN (:...links)",
                    {
                        ids: [linkID, ...checkIds, ...leaders.filter(v => v !== undefined).map(v => v.id)],
                        links: [linkID]
                    })
                firstConcerts = await this.concert_users.createQueryBuilder('concertUsers')
                    .where("concertUsers.id = :id", {id: checkIds[0]})
                    .andWhere("concertUsers.approve = :approve AND concertUsers.userId != :userId", {
                        approve: true,
                        userId: linkID
                    })
                    .leftJoinAndSelect("concertUsers.user", "user")
                    .leftJoinAndSelect("user.likes", "likes", "likes.concertId = :concertId OR likes IS NULL", {concertId: id})
                    .getMany()

                return {
                    linkItem,
                    likes,
                    participations,
                    firstConcerts,
                    leaders, ...await paginate<ConcertsUsersEntity>(data, {
                        page,
                        limit
                    })
                }
            }
        }


        let leaders = await this.concert_users.createQueryBuilder('concertUsers')
            .where("concertUsers.concertId = :concertId", {concertId: id})
            .andWhere("concertUsers.approve = :approve", {approve: true})
            .andWhere("concertUsers.userId NOT IN (:...ids)", {ids: [linkID]})
            .leftJoinAndSelect("concertUsers.user", "user")
            .leftJoinAndSelect("user.likes", "likes", "likes.concertId = :concertId OR likes IS NULL", {concertId: id})
            .orderBy('concertUsers.likesCount', 'DESC')
            .take(3)
            .getMany()

        data.andWhere("concertUsers.id NOT IN (:...ids) AND concertUsers.userId NOT IN (:...links)",
            {ids: [...leaders.filter(v => v !== undefined).map(v => v.id)], links: [linkID]})

        return {linkItem, likes, participations, leaders, ...await paginate<ConcertsUsersEntity>(data, {page, limit})}
    }


    async findAdmin({id, page, limit, sort_by}): Promise<any> {
        const data = await this.concert_users.createQueryBuilder('concertUsers')
            .where("concertUsers.concertId = :concertId", {concertId: id})
            .leftJoinAndSelect("concertUsers.user", "user")
            .leftJoinAndSelect("user.likes", "likes", "likes.concertId = :concertId OR likes IS NULL", {concertId: id})
            .orderBy('concertUsers.likesCount', 'DESC')

        if (sort_by === 'likes') {
            data.orderBy('concertUsers.likesCount', 'DESC')
        }
        if (sort_by === 'date') {
            data.orderBy('concertUsers.createdAt', 'DESC')
        }

        return await paginate<ConcertsUsersEntity>(data, {page, limit})

    }

    //  Получить концерт по id
    async findConcert(id): Promise<any> {
        return await this.concert.findOne(id,
            {
                relations: ["places"],
                order: {
                    total: 'DESC'
                }
            })
    }

    //  Удалить концерт по id
    async deleteConcert(id): Promise<any> {
        return await this.concert.delete(id)
    }

    //  Создать концерт по id
    async createConcert(createConcertDto: CreateConcertDto): Promise<any> {
        return await this.concert.save(createConcertDto);
    }

    //  Изменить концерт по id
    async updateConcert(id, updateConcertDto: UpdateConcertDto): Promise<any> {
        return await this.concert.update(id, updateConcertDto)
    }

    async updateConcertUser(id, aprroveConcertDto: AprroveConcertDto): Promise<any> {
        return await this.concert_users.update(id, aprroveConcertDto)
    }

    //  Искать концерт
    async searchConcert(id, search, page, limit, sort_by) {
        let participations = await this.concert_users.createQueryBuilder('concertUsers')
            .where("concertUsers.concertId = :concertId", {concertId: id})
            .andWhere("concertUsers.approve = :approve", {approve: false})
            .getCount()

        //  Получить количество лайков
        let likes = await this.likes.createQueryBuilder('likes')
            .where("likes.concertId = :concertId", {concertId: id})
            .getCount()

        const data = await this.concert_users.createQueryBuilder('concertUsers')
            .where("concertUsers.concertId = :concertId", {concertId: id})
            .andWhere("concertUsers.approve = :approve", {approve: false})
            .leftJoinAndSelect("concertUsers.user", "user")
            .where("LOWER(user.full_name) like LOWER(:full_name) OR LOWER(user.city) like LOWER(:city)", {
                full_name: `%${search}%`,
                city: `%${search}%`
            })
            .leftJoinAndSelect("user.likes", "likes")

        if (sort_by === 'likes') {
            data.orderBy('concertUsers.likesCount', 'DESC')
        }
        if (sort_by === 'date') {
            data.orderBy('concertUsers.createdAt', 'DESC')
        }

        return {likes, participations, ...await paginate<ConcertsUsersEntity>(data, {page, limit})}

    }
}
