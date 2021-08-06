type EnvTypes = 'development' | 'production' | 'test';

const environment = process.env.NODE_ENV.trim() as EnvTypes;

export interface IConfigurable {
   port: string;
   dbURI: string;
}

export interface IConfig {
   development: IConfigurable;
   production: IConfigurable;
   test: IConfigurable;
}

const development = {
   port: process.env.DEV_PORT ?? '3000',
   dbURI: process.env.DEV_DB_URI ?? '',
};

const production = {
   port: process.env.PORT ?? '3000',
   dbURI: process.env.DB_URI ?? '',
};

const test = {
   port: process.env.TEST_PORT ?? '3000',
   dbURI: process.env.TEST_DB_URI ?? '',
};

const config = {
   test,
   production,
   development,
};
export default config[environment];
