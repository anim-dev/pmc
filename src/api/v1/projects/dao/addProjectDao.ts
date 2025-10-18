import statusCode from "../../../../constants/statusCode";
import prisma from "../../../../prisma";
import { AsyncDaoTryCatch } from "../../../../utils/commomAsuncHandler";
import { createInternalResponse } from "../../../../utils/internalCommRes";

export const addNewProject_Dao = AsyncDaoTryCatch(
    async (reqBody: any) => {
        const valArr = [reqBody];
        const users = await prisma.user.findMany();
        return createInternalResponse(true, statusCode.HTTP.OK, '', null);
    },
    'addNewProject_Dao'
);
