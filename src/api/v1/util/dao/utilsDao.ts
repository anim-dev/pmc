import statusCode from "../../../../constants/statusCode";
import prisma from "../../../../prisma";
import { AsyncDaoTryCatch } from "../../../../utils/commomAsuncHandler";
import { createInternalResponse } from "../../../../utils/internalCommRes";

export const getMasterData_Dao = AsyncDaoTryCatch(
    async (reqParam: any) => {
        const result: Record<string, any[]> = {};

        const configs = await prisma.master_table_map.findMany({
            where: { code: { in: reqParam }, isActive: true }
        });
        for (const type of reqParam) {
            const config: any = configs.find((cfg: any) => cfg.code === type);
            if (config) {
                // Type assertion below
                const data = await prisma.$queryRawUnsafe<any[]>(`SELECT * FROM ${config.tableName}`);
                result[type] = data;
            } else {
                result[type] = [];
            }
        }

        return createInternalResponse(true, statusCode.HTTP.OK, '', result);
    },
    'getMasterData_Dao'
);


export const fetchAllZones_Dao = AsyncDaoTryCatch(
    async () => {
        const data = await prisma.zones.findMany();
        return createInternalResponse(true, statusCode.HTTP.OK, '', data);
    },
    "fetchAllZones_Dao"
);

export const fetchWardsByZone_Dao = AsyncDaoTryCatch(
    async (zoneId: any) => {
        const data =  await prisma.wards.findMany({ where: { zoneId: zoneId } });
        return createInternalResponse(true, statusCode.HTTP.OK, '', data);
    },
    "fetchAllZones_Dao"
);

export const fetchPrabhagsByWard_Dao = AsyncDaoTryCatch(
    async (wardId: any) => {
        const data = await prisma.prabhags.findMany({ where: { wardId: wardId } });
        return createInternalResponse(true, statusCode.HTTP.OK, '', data);
    },
    "fetchAllZones_Dao"
);