import { InternalResp } from "../types/types"

export const createInternalResponse = (
    success: boolean,
    statusCode: number,
    message: string,
    data: any,
    error?: any,
    extras?: any

): InternalResp  => {
    return {
        success,
        status: statusCode,
        message,
        data,
        error,
        extras
    }
}
