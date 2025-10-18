import { NextFunction, Request, Response } from "express";
import statusCode from "../constants/statusCode";
import httpError from "../utils/httpError";
import { resMsgDB } from "../constants/constMessage";

export const usrAgentIp_M = (req: Request, res: Response, next: NextFunction) => {
    try {
       if (!req.body) req.body = {};

    // Extract IP address
    const ip = 
      (req.headers['x-forwarded-for'] as string)?.split(",")[0]?.trim() || // handles proxy / load balancer
      req.socket?.remoteAddress ||
      req.ip ||
      null;

    // Extract User-Agent
    const userAgent = req.headers['user-agent'] || null;

    req.body.clientIp = ip;
    req.body.userAgent = userAgent;

    next();
    } catch (error) {
        console.log("Error in addCurrentDateTime middleware:", error);
        const err = new Error(resMsgDB.HTTP[statusCode.HTTP.INTERNAL_SERVER_ERROR]);
        return httpError(next, err, req, statusCode.HTTP.INTERNAL_SERVER_ERROR);
    }
}