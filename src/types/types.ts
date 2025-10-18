export type httpResponse_T = {
    success: boolean,
    statusCode: number,
    request?: {
        ip?: string | null,
        method?: string,
        url?: string,
    },
    message: string,
    responseData: unknown,
    extras?: object | null
}

export type httpError_T = {
    success: boolean,
    statusCode: number,
    request?: {
        ip?: string | null,
        method?: string,
        url?: string,
    },
    message: string,
    responseData: unknown,
    trace?: object | null,
    schemaError?: Record<string, string> | string
}

export type InternalResp  = {
   success:boolean,
    status:number,
    message:string,
    data:any,
    error?:any,
    extras?:any
}

export type pgQryRes_T =  {
  success: boolean;
  code: number,
  rawData?: unknown,
  rows?: unknown[];
  rowCount: number;
  duration?: number;
  error?: Error | unknown;
  message?: string;
}


export type hashOrgPassword = {
    salt: string;
    hashPwd: string | undefined;
    orgPwd: string;
}


// Need to add user Enagament template
export type EmailTemplateGroup =
  | 'authTemplates'
  | 'billingSubTemplates'
  | 'legalPolicyTemplates'
  | 'onBoardActivationTemplates';



  