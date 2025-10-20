import { Request } from "express";
import { AsyncModelTryCatch } from "../../../../utils/commomAsuncHandler";
import { createInternalResponse } from "../../../../utils/internalCommRes";
import statusCode from "../../../../constants/statusCode";
import { filterProjectsData_Dao, projectDetailsInfoById_Dao } from "../dao/filterDao";


export const filterProjectsData_Model = AsyncModelTryCatch(
    async (req: Request): Promise<any> => {
        
        const {zoneId,wardsId,prabhagsId, projectStatus } = req.body;

        const where: any = {};
       
        if (zoneId) where.zoneid = Number(zoneId);
        if (wardsId) where.wardsId = Number(wardsId);
        if (prabhagsId) where.prabhagsId = Number(prabhagsId);
        if (projectStatus) where.projectStatus = projectStatus;
        
         const projects = await filterProjectsData_Dao(where);
         console.log(projects)

        if (!projects.data.length) {
            return createInternalResponse(
                true,
                statusCode.HTTP.OK,
                'No data found',
                []
            );
        }

         return createInternalResponse(
            true,
            statusCode.HTTP.OK,
            'Projects fetched successfully',
            projects.data
        );
    
    },
    'filterProjectsData_Model'
);


export const projectDetailsInfoById_Model = AsyncModelTryCatch(
    async(req:Request):Promise<any> =>{
        const { projectId } = req.body;
        const projectDetailsInfo = await projectDetailsInfoById_Dao(projectId);
         return createInternalResponse(
            true,
            statusCode.HTTP.OK,
            'Projects details fetch successfully',
            projectDetailsInfo.data
        );

    },'projectDetailsInfoById_Model'
)