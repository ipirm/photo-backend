import {TypeOrmModuleOptions} from "@nestjs/typeorm";
export const ormConfig: TypeOrmModuleOptions = {

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


    // Host
    // ec2-54-75-244-161.eu-west-1.compute.amazonaws.com
    // Database
    // dfi00as3gc4s3i
    // User
    // tvjdvubhbjeorp
    // Port
    // 5432
    // Password
    // 39145cf0c261888101417c96aa9bf8a476da0c08076f45b0d5ae2ffbf900aabe
    // URI
    // postgres://tvjdvubhbjeorp:39145cf0c261888101417c96aa9bf8a476da0c08076f45b0d5ae2ffbf900aabe@ec2-54-75-244-161.eu-west-1.compute.amazonaws.com:5432/dfi00as3gc4s3i
    // Heroku CLI
    // heroku pg:psql postgresql-horizontal-03229 --app photo-backend-app


    type: 'postgres',
    host: 'ec2-54-75-244-161.eu-west-1.compute.amazonaws.com',
    url: 'postgres://ivmuqrqxxukqkw:962336f9063cd90498b82c1c3711c35ba6a818143bf5d2a150d68e0b71ca1652@ec2-52-31-233-101.eu-west-1.compute.amazonaws.com:5432/dcfmg399n4enmu',
    port: 5432,
    username: 'tvjdvubhbjeorp',
    password: '39145cf0c261888101417c96aa9bf8a476da0c08076f45b0d5ae2ffbf900aabe',
    database: 'dfi00as3gc4s3i',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    logging: true
}