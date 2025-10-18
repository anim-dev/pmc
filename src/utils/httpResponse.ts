import { Request, Response } from "express";
import { httpResponse_T } from "../types/types";
import { EApplicationEnvironment } from "../constants/application";
import { CONFIG } from "../config/appConf";

const httpResponseStruct = (
    req:Request,
    res:Response,
    success:boolean,
    responseStatusCode:number,
    responseMessage:string,
    data:unknown=null,
    extra:object = {}
)=>{
  try{
      const response:httpResponse_T = {
        success,
        statusCode:responseStatusCode,
        request:{
            ip:req.ip || null,
            method:req.method,
            url:req.originalUrl
        },
        message:responseMessage,
        responseData:data,
        extras:extra
    }


    if(EApplicationEnvironment.PROD === CONFIG.CURR_ENV){
        delete response.request;
    }

    // res.status(200).json(response); // Fake 200 
    res.status(responseStatusCode).json(response); // Real 
    
  }catch(err){
    console.log(err,'Httpresponse fn');
  }
    

}

export default httpResponseStruct;