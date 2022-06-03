
import dotenv from 'dotenv';
dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'uda_stackoverflow';
const MYSQL_USER = process.env.MYSQL_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
const MYSQL_PORT = process.env.MYSQL_PORT || '3306';

const SERVER_TOKEN_EXPIRE_TIME = process.env.SERVER_TOKEN_EXPIRE_TIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'fill_issurer_here';
const SERVER_ACCESS_TOKEN_SECRET = process.env.SERVER_ACCESS_TOKEN_SECRET || 'uda_stackoverflow_token';
const SERVER_REFRESH_TOKEN_SECRET = process.env.SERVER_REFRESH_TOKEN_SECRET || 'uda_stackoverflow_refresh_token';

const EMAIL_USERNAME = process.env.EMAIL_USERNAME || '';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';
const EMAIL_CONFIRM_ACCOUNT_SECRET = process.env.EMAIL_CONFIRM_ACCOUNT_SECRET || 'confirm_uda_user';
const EMAIL_CONFIRM_ACCOUNT_EXPIRE_TIME = process.env.EMAIL_CONFIRM_ACCOUNT_EXPIRE_TIME || '1d';
const EMAIL_RESET_PASSWORD_EXPIRE_TIME = process.env.EMAIL_CONFIRM_ACCOUNT_EXPIRE_TIME || '30d';

const GOOGLE_CLOUD_CLIENT_ID = process.env.GOOGLE_CLOUD_CLIENT_ID || '';
const GOOGLE_CLOUD_CLIENT_SECRET = process.env.GOOGLE_CLOUD_CLIENT_SECRET || '';
const GOOGLE_CLOUD_REDIRECT_URL = process.env.GOOGLE_CLOUD_REDIRECT_URL || '';
const GOOGLE_CLOUD_REFRESH_TOKEN = process.env.GOOGLE_CLOUD_REFRESH_TOKEN || '';

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || 'http://localhost:5000';
const CLIENT_ENDPOINT = process.env.SERVER_ENDPOINT || 'http://localhost:3000';

const SERVER_TOKEN = {
    expireTime: SERVER_TOKEN_EXPIRE_TIME,
    issuer : SERVER_TOKEN_ISSUER,
    secretKey: SERVER_ACCESS_TOKEN_SECRET,
    refreshSecretKey: SERVER_REFRESH_TOKEN_SECRET,
};

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    port: MYSQL_PORT
};

const EMAIL_ACCOUNT = {
    username: EMAIL_USERNAME,
    password: EMAIL_PASSWORD,
    secret: EMAIL_CONFIRM_ACCOUNT_SECRET,
    expireTime: EMAIL_CONFIRM_ACCOUNT_EXPIRE_TIME,
    resetPasswordExpireTime: EMAIL_RESET_PASSWORD_EXPIRE_TIME,
}

const GOOGLE_CLOUD_SERVICE = {
    clientId: GOOGLE_CLOUD_CLIENT_ID,
    clientSecret: GOOGLE_CLOUD_CLIENT_SECRET,
    redirectUrl: GOOGLE_CLOUD_REDIRECT_URL,
    clientRefreshToken: GOOGLE_CLOUD_REFRESH_TOKEN,
}

const SERVER_CONFIGS = {
    clientEndpoint: CLIENT_ENDPOINT,
    serverEndpoint: SERVER_ENDPOINT,
}

const configs = {
    mySQL: MYSQL,
    serverToken: SERVER_TOKEN,
    emailAccount: EMAIL_ACCOUNT,
    googleService: GOOGLE_CLOUD_SERVICE,
    serverVar: SERVER_CONFIGS
};

export default configs;