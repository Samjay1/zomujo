"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_development_1 = __importDefault(require("./config.development"));
const config_production_1 = __importDefault(require("./config.production"));
const environment = process.env.NODE_ENV || "development";
let config;
switch (environment) {
    case 'development':
        config = config_development_1.default;
        break;
    case 'production':
        config = config_production_1.default;
        break;
    default:
        throw new Error(`Unsupported environment: ${environment}`);
}
exports.default = config;
//# sourceMappingURL=config.js.map