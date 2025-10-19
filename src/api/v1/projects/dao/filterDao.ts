import statusCode from "../../../../constants/statusCode";
import prisma from "../../../../prisma";
import { AsyncDaoTryCatch } from "../../../../utils/commomAsuncHandler";
import { createInternalResponse } from "../../../../utils/internalCommRes";



export const filterProjectsData_Dao = AsyncDaoTryCatch(
    async(where:any)=>{
        const projects = await prisma.project.findMany({ where });
        console.log(projects)
        return createInternalResponse(true, statusCode.HTTP.OK, '', projects);
    },'filterProjectsData_Dao'
)