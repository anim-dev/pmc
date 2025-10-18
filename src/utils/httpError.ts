import { NextFunction, Request } from "express";
import errObject from "./errorObject";

const httpError = (nextFun:NextFunction , err:Error | unknown , req:Request, errorStatusCode:number = 500,customMessage?: string)=>{
    const errorObj = errObject(err,req,errorStatusCode,customMessage);
    nextFun(errorObj);
}

export default httpError;