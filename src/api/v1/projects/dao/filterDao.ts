import statusCode from "../../../../constants/statusCode";
import prisma from "../../../../prisma";
import { AsyncDaoTryCatch } from "../../../../utils/commomAsuncHandler";
import { createInternalResponse } from "../../../../utils/internalCommRes";



export const filterProjectsData_Dao = AsyncDaoTryCatch(
    async (where: any) => {
        const projects = await prisma.project.findMany({ where });
        return createInternalResponse(true, statusCode.HTTP.OK, '', projects);
    }, 'filterProjectsData_Dao'
)

export const projectDetailsInfoById_Dao = AsyncDaoTryCatch(
    async (projectId: any) => {
        const project = await prisma.project.findUnique({
            where: { id: Number(projectId) },
            include: {
                stageTypeMappings: {
                    include: {
                        stageType: true, 
                        statusMappings: true 
                    }
                }
            }
        });
        return createInternalResponse(true, statusCode.HTTP.OK, '', project);
    }, 'projectDetailsInfoById_Dao'
)