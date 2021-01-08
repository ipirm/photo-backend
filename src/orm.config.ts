import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const ormConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: 'photo-db-v.csqbl0tu3qtb.us-west-2.rds.amazonaws.com',
    port: 5432,
    username: 'root',
    password: "2587889e",
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
    // url: 'postgres://lqowmqwtxbysaj:c252ea6e013dd9d07f5b7e88a1d6be3781e079449eaa19d63c3169066862fc98@ec2-54-75-244-161.eu-west-1.compute.amazonaws.com:5432/d6d62urde2vnnu',
    // port: 5432,
    // username: 'lqowmqwtxbysaj',
    // password: 'c252ea6e013dd9d07f5b7e88a1d6be3781e079449eaa19d63c3169066862fc98',
    // database: 'd6d62urde2vnnu',
    // entities: ['dist/**/*.entity.js'],
    // migrations: ["dist/migrations/*{.ts,.js}"],
    // migrationsTableName: "migrations_typeorm",
    // migrationsRun: true,
    // synchronize: false,
    // logging: true,
    // cli: {
    //     migrationsDir: "migrations"
    // }

}