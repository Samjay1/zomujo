import developmentConfig from './config.development';
type AppConfig = typeof developmentConfig;
declare let config: AppConfig;
export default config;
