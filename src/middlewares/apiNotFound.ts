import { NextFunction, Request, Response } from "express";
import httpError from "../utils/httpError";
import { utilityMsg } from "../constants/constMessage";
import statusCode from "../constants/statusCode";

const notFound_M = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const error = new Error(utilityMsg.RESOURCE_NOT_FOUND.RESRC_NT_FND);
    httpError(next, error, req, statusCode.HTTP.NOT_FOUND);
  } catch (err) {
    console.log()
    next(err);
  }
};

export default notFound_M;
