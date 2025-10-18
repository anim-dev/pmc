import statusCode from "../../../../constants/statusCode";
import prisma from "../../../../prisma";
import { AsyncDaoTryCatch } from "../../../../utils/commomAsuncHandler";
import { createInternalResponse } from "../../../../utils/internalCommRes";

export const getMasterData_Dao = AsyncDaoTryCatch(
    async (reqParam: any) => {
        const result: Record<string, any[]> = {};

        const configs = await prisma.master_table_map.findMany({
            where: { code: { in: reqParam }, isactive: true }
        });

        for (const type of reqParam) {
            const config: any = configs.find((cfg: any) => cfg.code === type);
            if (config) {
                // Type assertion below
                const data = await prisma.$queryRawUnsafe<any[]>(`SELECT * FROM ${config.tablename}`);
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
    async (zoneId: Number) => {
        const data = await prisma.wards.findMany({
            where: { zoneid: zoneId }
        });
        return createInternalResponse(true, statusCode.HTTP.OK, '', data);
    },
    "fetchAllZones_Dao"
);

export const fetchPrabhagsByWard_Dao = AsyncDaoTryCatch(
    async (wardId: Number) => {
        const data = await prisma.prabhags.findMany({
            where: { wardid: wardId }
        });
        return createInternalResponse(true, statusCode.HTTP.OK, '', data);
    },
    "fetchAllZones_Dao"
);