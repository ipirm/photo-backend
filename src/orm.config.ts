import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const ormConfig: TypeOrmModuleOptions = {
    //
    // type: 'postgres',
    // host: "localhost",
    // port: 5432,
    // username: 'postgres',
    // password: "root",
    // database: "photo_db",
    // entities: ["dist/**/*.entity.js"],
    // migrations: ["dist/migrations/*{.ts,.js}"],
    // migrationsTableName: "migrations_typeorm",
    // migrationsRun: true,
    // synchronize: true,
    // logging: ['error'],
    // cli: {
    //     migrationsDir: "migrations"
    // }


    type: 'postgres',
    host: 'ec2-54-246-67-245.eu-west-1.compute.amazonaws.com',
    url: 'postgres://xlgvltvzwzfjds:755c4d0ffdec3852f6a95b98fd511bf05ebbf9b58a6c665501ab4a37ce0b559c@ec2-54-246-67-245.eu-west-1.compute.amazonaws.com:5432/d6h6ad27rormcs',
    port: 5432,
    username: 'xlgvltvzwzfjds',
    password: '755c4d0ffdec3852f6a95b98fd511bf05ebbf9b58a6c665501ab4a37ce0b559c',
    database: 'd6h6ad27rormcs',
    entities: ['dist/**/*.entity.js'],
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true,
    synchronize: true,
    logging: true,
    cli: {
        migrationsDir: "migrations"
    }

}