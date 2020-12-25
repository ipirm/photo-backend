import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/users.entity";
import {Repository} from "typeorm";

@Injectable()
export class PaypalService {
    constructor(@InjectRepository(UsersEntity) private readonly user: Repository<UsersEntity>) {
    }

    async giveMoney(id): Promise<any> {
        return await this.user.update(id, {purchased: true})
    }
    async getMoney(id): Promise<any> {
        return await this.user.update(id, {purchased: false})
    }

}
