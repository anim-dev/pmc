import dotenv from "dotenv";
dotenv.config();

import { EApplicationEnvironment } from '../constants/application';

const getDefaultOrigin = () => {
    // This should not be backend ip
    if (process.env.ENV === EApplicationEnvironment.PROD) {
        return `${process.env.SSL}://${process.env.FRONTEND_IP}`;
    } else {
        return `${process.env.SSL}://${process.env.FRONTEND_IP}:${process.env.FRONTEND_PORT}`;
    }
};


export const CONFIG = Object.freeze({
    CURR_ENV: process.env.ENV as string,
    API_BASE_URL: `${process.env.SSL}://${process.env.BACKEND_IP}:${parseInt(process.env.BACKEND_PORT as string)}`,
    SSL: process.env.SSL,
    IP: process.env.BACKEND_IP,
    PORT: parseInt(process.env.BACKEND_PORT as string),
    ORIGINS: process.env.CORS_ORIGINS?.split(',') || [getDefaultOrigin()],
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
});
