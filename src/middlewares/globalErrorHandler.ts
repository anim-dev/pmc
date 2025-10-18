import { NextFunction, Request, Response } from "express";
import { httpError_T } from "../types/types";
import statusCode from "../constants/statusCode";
import { resMsgDB } from "../constants/constMessage";
import { EApplicationEnvironment } from "../constants/application";
import { CONFIG } from "../config/appConf";

const globalErrorHandler_M = (err: httpError_T, _: Request, res: Response, __: NextFunction) => {
    const errstatusCode = err.statusCode || statusCode.HTTP.INTERNAL_SERVER_ERROR;
    err.message = EApplicationEnvironment.DEV === CONFIG.CURR_ENV ? err.message : resMsgDB.HTTP[statusCode.HTTP.INTERNAL_SERVER_ERROR];
    res.status(errstatusCode).json(err);
}

export default globalErrorHandler_M;