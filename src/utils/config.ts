import developmentConfig from './config.development';
import productionConfig from './config.production';

const environment = process.env.NODE_ENV || "development";

type AppConfig = typeof developmentConfig;
let config:AppConfig;

switch (environment) {
    case 'development':
        config = developmentConfig;
        break;
    case 'production':
        config = productionConfig;
        break;
    default:
        throw new Error(`Unsupported environment: ${environment}`);
}

export default config;
