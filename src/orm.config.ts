import {TypeOrmModuleOptions} from "@nestjs/typeorm";
export const ormConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password: "root",
    database: "photo_db",
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true,
    synchronize: true,
    logging: ['error'],
    cli: {
        migrationsDir: "migrations"
    }



    // type: 'postgres',
    // host: 'c2-52-31-233-101.eu-west-1.compute.amazonaws.com',
    // url: 'postgres://ivmuqrqxxukqkw:962336f9063cd90498b82c1c3711c35ba6a818143bf5d2a150d68e0b71ca1652@ec2-52-31-233-101.eu-west-1.compute.amazonaws.com:5432/dcfmg399n4enmu',
    // port: 5432,
    // username: 'ivmuqrqxxukqkw',
    // password: '962336f9063cd90498b82c1c3711c35ba6a818143bf5d2a150d68e0b71ca1652',
    // database: 'dcfmg399n4enmu',
    // entities: ['dist/**/*.entity.js'],
    // synchronize: true,
    // logging: true
}