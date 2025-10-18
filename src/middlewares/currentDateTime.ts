import { NextFunction, Request, Response } from "express";
import { formatCurrentUTCDateTime } from "../utils/commonDateFn";
import httpError from "../utils/httpError";
import statusCode from "../constants/statusCode";
import { resMsgDB } from "../constants/constMessage";

export const addCurrDateTime_M = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) req.body = {};
        req.body.currentDateTime = formatCurrentUTCDateTime();
        next();
    } catch (error) {
        console.log("Error in addCurrentDateTime middleware:", error);
        const err = new Error(resMsgDB.HTTP[statusCode.HTTP.INTERNAL_SERVER_ERROR]);
        return httpError(next, err, req, statusCode.HTTP.INTERNAL_SERVER_ERROR);
    }
}