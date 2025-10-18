import { Request } from "express";
import { AsyncModelTryCatch } from "../../../../utils/commomAsuncHandler";
import { addNewProject_Dao } from "../dao/addProjectDao";
import { createInternalResponse } from "../../../../utils/internalCommRes";
import statusCode from "../../../../constants/statusCode";
import { utilityMsg } from "../../../../constants/constMessage";

export const addNewProject_Model = AsyncModelTryCatch(
  async (req: Request): Promise<any> => {
    const reqBody = req.body;
    await addNewProject_Dao(reqBody);
    return createInternalResponse(
      true,
      statusCode.HTTP.OK,
      reqBody.project_id
        ? utilityMsg.PROJECT.PROJECT_UPDATE
        : utilityMsg.PROJECT.PROJECT_CREATE,
      null
    );
  },
  "addNewProject_Model"
);
