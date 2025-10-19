import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { validateSchema } from "./validateSchema";
import httpError from "../httpError";
import statusCode from "../../constants/statusCode";
import { resMsgDB } from "../../constants/constMessage";

interface ValidationOptions {
    customErrorHandler?: (errors: Record<string, string>, req: Request, res: Response) => void;
    statusCode?: number;
    message?: string;
}

export const reqSchemaValidator_M = (schema: z.ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validation = validateSchema(schema, req.body);
            if (validation.success) {
                req.body = validation.data;
                next();
            } else {
                console.log('Validation failed:', validation.errors);
                return httpError(next, validation.errors, req, statusCode.HTTP.BAD_REQUEST, "Invalid input data provided");
            }
        }
        catch (error) {
            console.log('Validation reqSchemaValidator_M error:', error);
            const serviceErr = new Error(resMsgDB.HTTP[statusCode.HTTP.INTERNAL_SERVER_ERROR])
            return httpError(next, serviceErr, req, statusCode.HTTP.INTERNAL_SERVER_ERROR)
        }
    };
} 