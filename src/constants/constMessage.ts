import statusCode from "./statusCode";

export const resMsgDB = Object.freeze({
  HTTP: {
    [statusCode.HTTP.CONTINUE]: 'Continue',
    [statusCode.HTTP.SWITCHING_PROTOCOLS]: 'Switching Protocols',
    [statusCode.HTTP.PROCESSING]: 'Processing',
    [statusCode.HTTP.EARLY_HINTS]: 'Early Hints',
    
    [statusCode.HTTP.OK]: 'OK',
    [statusCode.HTTP.CREATED]: 'Created',
    [statusCode.HTTP.ACCEPTED]: 'Accepted',
    [statusCode.HTTP.NON_AUTHORITATIVE_INFORMATION]: 'Non-Authoritative Information',
    [statusCode.HTTP.NO_CONTENT]: 'No Content',
    [statusCode.HTTP.RESET_CONTENT]: 'Reset Content',
    [statusCode.HTTP.PARTIAL_CONTENT]: 'Partial Content',

    [statusCode.HTTP.MULTIPLE_CHOICES]: 'Multiple Choices',
    [statusCode.HTTP.MOVED_PERMANENTLY]: 'Moved Permanently',
    [statusCode.HTTP.FOUND]: 'Found',
    [statusCode.HTTP.SEE_OTHER]: 'See Other',
    [statusCode.HTTP.NOT_MODIFIED]: 'Not Modified',
    [statusCode.HTTP.TEMPORARY_REDIRECT]: 'Temporary Redirect',
    [statusCode.HTTP.PERMANENT_REDIRECT]: 'Permanent Redirect',

    [statusCode.HTTP.BAD_REQUEST]: 'Bad Request',
    [statusCode.HTTP.UNAUTHORIZED]: 'Unauthorized',
    [statusCode.HTTP.FORBIDDEN]: 'Forbidden',
    [statusCode.HTTP.NOT_FOUND]: 'Not Found',
    [statusCode.HTTP.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
    [statusCode.HTTP.CONFLICT]: 'Conflict',
    [statusCode.HTTP.GONE]: 'Gone',
    [statusCode.HTTP.PAYLOAD_TOO_LARGE]: 'Payload Too Large',
    [statusCode.HTTP.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported Media Type',
    [statusCode.HTTP.TOO_MANY_REQUESTS]:'Too Many Requests',

    [statusCode.HTTP.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    [statusCode.HTTP.NOT_IMPLEMENTED]: 'Not Implemented',
    [statusCode.HTTP.BAD_GATEWAY]: 'Bad Gateway',
    [statusCode.HTTP.SERVICE_UNAVAILABLE]: 'Service Unavailable',
    [statusCode.HTTP.GATEWAY_TIMEOUT]: 'Gateway Timeout',
  },

  CUSTOM:{
    [statusCode.CUSTOM.DB.DB_EXEC_FAIL]:'Qry Execute Success',
    [statusCode.CUSTOM.DB.DB_EXEC_FAIL]:'Qry Execute Fail',
  }

});
export type Message = typeof resMsgDB;



export const utilityMsg = Object.freeze({
    REQ_SANITIZATION_MSG:{
      REQ_SAN_FAIL:'Request sanitization failed',
      BODY_SAN_FAIL:'Request body sanitization failed - potentially malicious content detected',
      QRY_SAN_FAIL:'Query parameter sanitization failed - request rejected for security',
      URL_PARAM_UNSAFE:'Sanitized URL params are unsafe',
      URL_HIGH_RISK:'URL parameters contain potentially dangerous content',
      URL_PARAM_SAN_FAIL:'Param sanitization failed unexpectedly'
    },
    RATE_LIMIT_MSG:{
      CONFIG_ERR:'Rate limiter configuration error',
      IP_NOT_FOUND:'Unable to identify client'
    },
    RESOURCE_NOT_FOUND:{
     RESRC_NT_FND:'Api not found', 
    }
})