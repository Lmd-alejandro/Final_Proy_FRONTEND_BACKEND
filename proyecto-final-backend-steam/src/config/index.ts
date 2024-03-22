import dotenv from 'dotenv';

dotenv.config();

const config: any = {
    port: process.env.PORT || 3000,
    hostDB: process.env.DB_HOST,
    userDB: process.env.DB_USER,
    passwordDB: process.env.DB_PASSWORD,
    nameDB: process.env.DB_NAME,
    keyToken: process.env.KEY_TOKEN

};

export default config;