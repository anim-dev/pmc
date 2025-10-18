import { Request } from "express";
import { httpError_T } from "../types/types";
import { CONFIG } from "../config/appConf";
import { EApplicationEnvironment } from "../constants/application";

const errObject = (error: Error | unknown | Record<string, string>, req: Request, errorStatusCode: number = 500, customMessage?: string) => {

    let message: string;
    let validationErrors: Record<string, string> | null = null;


    if (error instanceof Error) {
        message = error.message || "respond msg const";
    } else if (typeof error === 'object' && error !== null && !Array.isArray(error)) {
        validationErrors = error as Record<string, string>;
        message = customMessage || "Invalid input data provided";
    } else {
        message = "respond msg const";
    }

    const errObj: httpError_T = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        },
        message: message,
        responseData: null,
        trace: error instanceof Error ? { error: error.stack } : null,
        ...(validationErrors && { schemaError: validationErrors })
    };


    // == Production check ===
    if (CONFIG.CURR_ENV === EApplicationEnvironment.PROD) {
        delete errObj.request;
        delete errObj.trace;
        if (validationErrors) {
            delete errObj.schemaError;
        }
    }
    
    return errObj;
}

export default errObject;