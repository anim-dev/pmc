
import DotenvFlow from "dotenv-flow";

import { EApplicationEnvironment } from '../constants/application';
DotenvFlow.config();

const getDefaultOrigin = () => {
    // This should not be backend ip
    if (process.env.ENV === EApplicationEnvironment.PROD) {
        return `${process.env.SSL}://${process.env.FRONTEND_IP}`;
    } else {
        return `${process.env.SSL}://${process.env.FRONTEND_IP}:${process.env.FRONTEND_PORT}`;
    }
};

const getPostgresSSLConfig = () => {
    if (process.env.DB_SSL_ENABLED === 'true' && process.env.ENV === EApplicationEnvironment.PROD) {
        return {
            rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
            ca: process.env.SSL_CA_PATH?.toString(),
            key: process.env.SSL_KEY_PATH?.toString(),
            cert: process.env.SSL_CERT_PATH?.toString()
        };
    }
    return false; // Disable SSL
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
    DB_CONFIG_POSTGRES: {
        user: process.env.DB_USER_PG,
        host: process.env.DB_HOST_PG,
        port: parseInt(process.env.DB_PORT_PG || '5432'),
        password: process.env.DB_PASSWORD_PG,
        database: process.env.DB_NAME_PG,
        ssl: getPostgresSSLConfig(),
        max: parseInt(process.env.DB_POOL_MAX || '50'), // Scale up
        min: parseInt(process.env.DB_POOL_MIN || '5'),  // Warm pool
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIME_PG || '60000'), // Shorter idle time
        acquireTimeoutMillis: parseInt(process.env.DB_ACC_TIME_OUT_MILL_SEC_PG || '10000'), // Prevent hanging requests
        connectionTimeoutMillis: parseInt(process.env.DB_CONN_TIME_MILL_SEC_PG || '5000'),
        maxUses: parseInt(process.env.DB_MAX_USERS || '7500'),

        // Add these for high traffic
        allowExitOnIdle: process.env.DB_ALW_EXIT_IDLE_PG === 'true', // Let pool shrink during low traffic
        maxLifetimeMillis: parseInt(process.env.DB_MAX_LIF_TME_MILL || '600000'), // Rotate connections (10 min)
    },

})