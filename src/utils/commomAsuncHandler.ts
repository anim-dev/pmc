import { NextFunction, Request, RequestHandler, Response } from "express";
import httpError from "./httpError";
import statusCode from "../constants/statusCode";
import { resMsgDB } from "../constants/constMessage";
type TokenType = 'VF_RT' | 'VF_AT' | 'NA';
// ==================== WHEN TO USE WHICH? ====================
/*
RECOMMENDATION:
- Use Async* for database, API calls, file operations
- Use Sync* for validation, formatting, calculations
- Use auto-detecting for mixed scenarios or legacy code
*/

// ==================== EXPRESS CONTROLLER WRAPPER ====================
export const ControllerTryCatch = (handler: RequestHandler, controllerEndPoint: string): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            console.log(`ERROR ON ${controllerEndPoint} Controller Endpoint`, error);
            return httpError(next, error, req, statusCode.HTTP.INTERNAL_SERVER_ERROR, resMsgDB.HTTP[statusCode.HTTP.INTERNAL_SERVER_ERROR]);
        }
    }
}

// ==================== ASYNC FUNCTION WRAPPERS ====================
// Generic async wrapper
export const AsyncFunctionTryCatch = <T extends (...args: any[]) => Promise<any>>(
    asyncFunc: T,
    functionName: string,
    layer: 'Model' | 'Dao' | 'Service' | 'Utils' = 'Model'
): T => {
    return (async (...args: Parameters<T>) => {
        try {
            const result = await asyncFunc(...args);
            return result;
        } catch (error) {
            console.error(`ERROR ON ${functionName} ${layer} Function (Async)`, error);
            throw error;
        }
    }) as T;
};

// Async convenience wrappers
export const AsyncModelTryCatch = <T extends (...args: any[]) => Promise<any>>(func: T, modelFnName: string): T =>
    AsyncFunctionTryCatch(func, modelFnName, 'Model');

export const AsyncDaoTryCatch = <T extends (...args: any[]) => Promise<any>>(func: T, daoFnName: string): T =>
    AsyncFunctionTryCatch(func, daoFnName, 'Dao');

export const AsyncServiceTryCatch = <T extends (...args: any[]) => Promise<any>>(func: T, serviceFnName: string): T =>
    AsyncFunctionTryCatch(func, serviceFnName, 'Service');

export const AsyncUtilsTryCatch = <T extends (...args: any[]) => Promise<any>>(func: T, utilsFnName: string): T =>
    AsyncFunctionTryCatch(func, utilsFnName, 'Utils');


export const AsyncJWTFunctionTryCatch = <T extends (...args: any[]) => Promise<any>>(
    asyncFunc: T,
    utilsFnName: string,
    tokenType: TokenType,
    layer: 'JWT'
): T => {
    return (async (...args: Parameters<T>) => {
        try {
            const result = await asyncFunc(...args);
            return result;
        } catch (error: any) {
            console.error(`ERROR ON ${utilsFnName}  ${layer} Function`, error);

            // Handle JWT-specific errors and return structured response
            if (error.name === 'TokenExpiredError') {
                return {
                    valid: false,
                    expired: true,
                    error: 'Token expired',
                    code: 'TOKEN_EXPIRED',
                    tokenType
                };
            }

            if (error.name === 'JsonWebTokenError') {
                return {
                    valid: false,
                    expired: false,
                    error: 'Invalid token',
                    code: 'TOKEN_INVALID',
                    tokenType
                };
            }

            if (error.name === 'NotBeforeError') {
                return {
                    valid: false,
                    expired: false,
                    error: 'Token not active yet',
                    code: 'TOKEN_NOT_ACTIVE',
                    tokenType
                };
            }

            // Handle custom errors (like token type validation)
            if (error.message === 'Invalid token type') {
                return {
                    valid: false,
                    expired: false,
                    error: 'Invalid token type',
                    code: 'INVALID_TOKEN_TYPE',
                    tokenType
                };
            }

            // Generic error
            return {
                valid: false,
                expired: false,
                error: error.message || 'Token verification failed',
                code: 'TOKEN_ERROR',
                tokenType
            };
        }
    }) as T;
};

export const AsyncJWTTryCatch = <T extends (...args: any[]) => Promise<any>>(func: T, utilsFnName: string, tokenType: TokenType): T =>
    AsyncJWTFunctionTryCatch(func, utilsFnName, tokenType, 'JWT');



// ==================== SYNC FUNCTION WRAPPERS ====================

// Generic sync wrapper
export const SyncFunctionTryCatch = <T extends (...args: any[]) => any>(
    syncFunc: T,
    functionName: string,
    layer: 'Model' | 'Dao' | 'Service' | 'Utils' = 'Model'
): T => {
    return ((...args: Parameters<T>) => {
        try {
            const result = syncFunc(...args);
            return result;
        } catch (error) {
            console.error(`ERROR ON ${functionName} ${layer} Function (Sync)`, error);
            throw error;
        }
    }) as T;
};

// Sync convenience wrappers
export const SyncModelTryCatch = <T extends (...args: any[]) => any>(func: T, modelFnName: string): T =>
    SyncFunctionTryCatch(func, modelFnName, 'Model');

export const SyncDaoTryCatch = <T extends (...args: any[]) => any>(func: T, daoFnName: string): T =>
    SyncFunctionTryCatch(func, daoFnName, 'Dao');

export const SyncServiceTryCatch = <T extends (...args: any[]) => any>(func: T, serviceFnName: string): T =>
    SyncFunctionTryCatch(func, serviceFnName, 'Service');

export const SyncUtilsTryCatch = <T extends (...args: any[]) => any>(func: T, utilsFnName: string): T =>
    SyncFunctionTryCatch(func, utilsFnName, 'Utils');

// ==================== USAGE EXAMPLES ====================

// ✅ ASYNC EXAMPLES

// // 1. Async Model - Database operations
// const verifyOtpModel = AsyncModelTryCatch(
//     async (otpData: { email: string; otp: string }) => {
//         const user = await User.findOne({ email: otpData.email });
//         if (!user) {
//             throw new Error('User not found');
//         }
//         return user;
//     },
//     'verifyOtpModel'
// );

// // 2. Async DAO - Data Access
// const findUserByEmailDao = AsyncDaoTryCatch(
//     async (email: string) => {
//         const user = await User.findOne({ email }).select('-password');
//         return user;
//     },
//     'findUserByEmailDao'
// );

// // 3. Async Service - External API calls
// const sendOtpEmailService = AsyncServiceTryCatch(
//     async (email: string, otp: string) => {
//         const emailResponse = await emailService.send({
//             to: email,
//             subject: 'Your OTP Code',
//             template: 'otp',
//             data: { otp, expiresIn: '5 minutes' }
//         });
//         return emailResponse;
//     },
//     'sendOtpEmailService'
// );

// // 4. Async Utils - File operations
// const readConfigFileUtils = AsyncUtilsTryCatch(
//     async (filePath: string) => {
//         const fs = await import('fs/promises');
//         const data = await fs.readFile(filePath, 'utf8');
//         return JSON.parse(data);
//     },
//     'readConfigFileUtils'
// );

// ✅ SYNC EXAMPLES


// // 4. Sync Utils - String/data manipulation
// const generateSlugUtils = SyncUtilsTryCatch(
//     (title: string) => {
//         return title
//             .toLowerCase()
//             .replace(/[^a-z0-9 -]/g, '') // Remove special chars
//             .replace(/\s+/g, '-')        // Replace spaces with hyphens
//             .replace(/-+/g, '-')         // Replace multiple hyphens
//             .trim();
//     },
//     'generateSlugUtils'
// );


export const MiddlewareFunctionTryCatch = <T extends RequestHandler>(
    middlewareFunc: T,
    middlewareName: string,
    layer: 'CommonMiddleware' | 'Auth' | 'FeatureFlag' | 'RoleCheck' | 'Utils' = 'CommonMiddleware'
): T => {
    return (async (req: Request, res: Response, next: NextFunction) => {
        try {
            await middlewareFunc(req, res, next);
        } catch (error) {
            console.error(`ERROR ON ${middlewareName} ${layer} Function`, error);

            return httpError(
                next,
                error,
                req,
                statusCode.HTTP.INTERNAL_SERVER_ERROR,
                resMsgDB.HTTP[statusCode.HTTP.INTERNAL_SERVER_ERROR]
            );
        }
    }) as T;
};



export const AuthMiddlewareTryCatch = <T extends RequestHandler>(
    func: T,
    fnName: string
): T => MiddlewareFunctionTryCatch(func, fnName, 'Auth');

export const FeatureFlagMiddlewareTryCatch = <T extends RequestHandler>(
    func: T,
    fnName: string
): T => MiddlewareFunctionTryCatch(func, fnName, 'FeatureFlag');

export const RoleCheckMiddlewareTryCatch = <T extends RequestHandler>(
    func: T,
    fnName: string
): T => MiddlewareFunctionTryCatch(func, fnName, 'RoleCheck');


export const CommonMiddlewareTryCatch = <T extends RequestHandler>(
    func: T,
    fnName: string
): T => MiddlewareFunctionTryCatch(func, fnName, 'CommonMiddleware');