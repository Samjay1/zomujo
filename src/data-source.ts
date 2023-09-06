import {DataSource} from "typeorm";
import path from "path";
import config from "./utils/config";

require("dotenv").config();

export const dataSource = new DataSource({
    // type: 'mssql',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, 'models', '**', '*.{ts,js}')],
    logging: true,
    synchronize: config.synchronize,
    extra: {
        // trustedConnection: true,
        // trustServerCertificate: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
    }
})