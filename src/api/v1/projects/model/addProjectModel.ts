
import { Request } from "express";
import { AsyncModelTryCatch } from "../../../../utils/commomAsuncHandler";
import { addNewProject_Dao } from "../dao/addProjectDao";
import { createInternalResponse } from "../../../../utils/internalCommRes";
import statusCode from "../../../../constants/statusCode";


export const addNewProject_Model = AsyncModelTryCatch(
    async (req: Request): Promise<any> => {
    const reqBody = req.body
    const addNewProjectRes = await addNewProject_Dao(reqBody);
    return createInternalResponse(false, statusCode.HTTP.INTERNAL_SERVER_ERROR, "Failed to create user", null);

    },'addNewProject_Model'
)