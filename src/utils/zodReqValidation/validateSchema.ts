import { z } from "zod";

interface ValidationResult {
    success: boolean;
    data?: any;
    errors?: Record<string, string>;
}


export const validateSchema = (schema: z.ZodSchema<any>, reqBody: any): ValidationResult => {
    const { currentDateTime, clientIp, userAgent, ...bodyToValidate } = reqBody;
    
    const result = schema.safeParse(bodyToValidate);

    if (result.success) {
        return {
            success: true,
            data: {
                ...result.data,
                ...(currentDateTime && { currentDateTime }),
                ...(clientIp && { clientIp }),
                ...(userAgent && { userAgent })
            }
        };
    }
    
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
        const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
        errors[path] = issue.message;
    });
    
    return {
        success: false,
        errors
    };
};