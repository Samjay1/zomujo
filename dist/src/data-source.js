"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./utils/config"));
require("dotenv").config();
exports.dataSource = new typeorm_1.DataSource({
    type: 'mssql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path_1.default.join(__dirname, 'models', '**', '*.{ts,js}')],
    logging: true,
    synchronize: config_1.default.synchronize,
    extra: {
        trustedConnection: true,
        trustServerCertificate: true,
    }
});
//# sourceMappingURL=data-source.js.map