export default () => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 3000,
    host: 'localhost',
  },
  api: {
    prefix: process.env.API_PREFIX,
    version: process.env.API_VERSION,
    title: '服务端文档',
    description: '这是服务端的文档',
    maintain: 'shixin',
    contact: 'shixin.work@outlook.com',
  },
  jwt: {
    secret: process.env.JWT_SECRIT,
    expire: process.env.JWT_TOKEN_EXPIRE,
  },
  cache: {},
  redis: {},
  database: {
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
});

export interface ServerConfig {
  port: number;
  host: string;
}

export interface ApiConfig {
  title: string;
  description?: string;
  prefix: string;
  version: string;
  maintain?: string;
  contact?: string;
}

export interface JwtConfig {
  secret: string;
  expire: string;
}

export interface DBConfig {
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

export enum CONFIG_TYPE {
  SERVER = 'server',
  API = 'api',
  JWT = 'jwt',
  CACHE = 'cache',
  REDIS = 'redis',
  DB = 'database',
}
