import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PlacesEntity} from "../entities/places.entity";
import {AddPlaceDto} from "./dto/add-place.dto";
import {I18nRepository} from "typeorm-i18n";

@Injectable()
export class PlaceService {
    constructor(
        @InjectRepository(PlacesEntity) private readonly place: I18nRepository<PlacesEntity>,
    ) {
    }

    async addPlace(addPlaceDto: AddPlaceDto): Promise<any> {
        return await this.place.save(addPlaceDto)
    }

    async removePlace(id: string): Promise<any> {
        return this.place.delete(id)
    }

    async getAllPlace(): Promise<any> {
        return this.place.find()
    }

    async getOnePlace(id: string): Promise<any> {
        return this.place.findOne(id)
    }

    async updateUser(id, addPlaceDto: AddPlaceDto): Promise<any> {
        return await this.place.update(id, addPlaceDto)
    }

}
