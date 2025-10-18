// import moment from "moment";
// import fs from 'fs/promises';
// import path from "path";
// import { GEN_LOG } from "../loggerHelpers/logger";
// import { crntEnvSortName } from "../cmnHlprFn";
// import { catchLogSocketSetUp } from "../loggerHelpers/transPortlogBySocket";
// import { isSocketReady } from "../../services/socket/initAllSocket";



// export const catchBlockErrorLog = async (
//     error: Error | null | unknown,
//     occurLocation: string = '') => {

//     // Date once in your preferred format
//     const dateStr = moment().format('DD/MMM/YYYY'); // e.g. 29/May/2025
//     const utcTime = moment().utc().format('HH:mm:ss [UTC]');
//     const localTime = moment().format('HH:mm:ss');
//     const gmtOffset = moment().format('Z'); // e.g. +05:30

//     const localTimeWithGMT = `${localTime} GMT${gmtOffset}`;
//     const combinedTime = `${dateStr} || ${utcTime} || ${localTimeWithGMT}`;

//     // Safely extract error information
//     let errorMessage = 'Unknown error';
//     let errorStack = '';

//     if (error instanceof Error) {
//         errorMessage = error.message;
//         errorStack = error.stack || '';
//     } else if (typeof error === 'string') {
//         errorMessage = error;
//     } else {
//         errorMessage = JSON.stringify(error);
//     }

//     const logMessage = `${combinedTime} - Error: ${errorMessage}\n${errorStack}\n\n`;

//     const logDir = path.join(__dirname, '../', '../', '../', 'logs', `${crntEnvSortName()}_CatchBlock`);
//     const logDirApi = path.join(__dirname, '../', '../', '../', 'logs', `${crntEnvSortName()}_API_LOGGER`);

//     try {
//         await fs.mkdir(logDir, { recursive: true });
//         // const currentDate = moment().utc().format('YYYYMMDD');
//         const currentDate = moment().format('DD-MM-YYYY');
//         const logFilePath = path.join(logDir, `${crntEnvSortName()}_CatchErr_${currentDate}.log`);
//         const logFilePathApi = path.join(logDirApi, `${crntEnvSortName()}_API_${currentDate}.log`);

//         const timestampUTC = moment().utc().format('YYYY-MM-DD HH:mm:ss');
//         const timestampLocal = moment().format('YYYY-MM-DD HH:mm:ss');

//         const formattedLogMessage = `[Local: ${timestampLocal} GMT${gmtOffset}] [UTC: ${timestampUTC}]  [${occurLocation}] [${crntEnvSortName()}] ${logMessage}\n`;

//         await fs.appendFile(logFilePath, formattedLogMessage);
//         await fs.appendFile(logFilePathApi, formattedLogMessage);

//         if (isSocketReady()) {
//             await catchLogSocketSetUp(logMessage, timestampLocal);
//         } else {
//             console.warn("⚠️ Socket not ready yet, skipping socket log");
//         }

//     } catch (err) {
//         console.error('Failed to write error log to file:', err);
//         GEN_LOG.error('Some Error Occurs on catchBlockErrorLog fn')
//     }
// };