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
    // host: 'ec2-54-75-244-161.eu-west-1.compute.amazonaws.com',
    // url: 'postgres://tvjdvubhbjeorp:39145cf0c261888101417c96aa9bf8a476da0c08076f45b0d5ae2ffbf900aabe@ec2-54-75-244-161.eu-west-1.compute.amazonaws.com:5432/dfi00as3gc4s3i',
    // port: 5432,
    // username: 'tvjdvubhbjeorp',
    // password: '39145cf0c261888101417c96aa9bf8a476da0c08076f45b0d5ae2ffbf900aabe',
    // database: 'dfi00as3gc4s3i',
    // entities: ['dist/**/*.entity.js'],
    // migrations: ["dist/migrations/*{.ts,.js}"],
    // migrationsTableName: "migrations_typeorm",
    // migrationsRun: true,
    // synchronize: true,
    // logging: true,
    // cli: {
    //     migrationsDir: "migrations"
    // }

}