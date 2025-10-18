import express, { Application } from "express";
import cors from 'cors';
import path from 'path';

import { CONFIG } from "./config/appConf";
import { controllerPathResolver } from "./config/controllerPathResolver";
import notFound_M from "./middlewares/apiNotFound";
import globalErrorHandler_M from "./middlewares/globalErrorHandler";
import { addCurrDateTime_M } from "./middlewares/currentDateTime";
import { usrAgentIp_M } from "./middlewares/userAgent";
const app: Application = express();


app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add GET and other methods
  origin: CONFIG.ORIGINS,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'x-request-id'],
  exposedHeaders: ['Set-Cookie', 'x-request-id'],
  maxAge: 86400 // Cache preflight for 24 hours
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use(addCurrDateTime_M);
app.use(usrAgentIp_M);

const appInit = async () => {
  try {

    await controllerPathResolver(app);
    app.use(notFound_M);
    app.use(globalErrorHandler_M);

    const server = app.listen(CONFIG.PORT, () => {
      console.info(`🚀 Server running  ${CONFIG.API_BASE_URL}`)
    });

    const shutdown = async () => {
      console.info('🛑 Shutting down server...');

      server.close(async () => {
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);


    process.on('unhandledRejection', async (reason) => {
      console.error('Unhandled Rejection:', reason);
      server.close(() => process.exit(1));
    });
  }
  catch (error) {
    console.error('❌ App initialization failed:', error);
    process.exit(1);
  }
}

appInit();