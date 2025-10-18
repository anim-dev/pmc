import { Request } from "express";
import { AsyncModelTryCatch } from "../../../../utils/commomAsuncHandler";
import { fetchAllZones_Dao, fetchPrabhagsByWard_Dao, fetchWardsByZone_Dao, getMasterData_Dao } from "../dao/utilsDao";
import { createInternalResponse } from "../../../../utils/internalCommRes";
import statusCode from "../../../../constants/statusCode";


export const getMasterData_Model = AsyncModelTryCatch(
    async (req: Request): Promise<any> => {
        const reqParam: string[] = req.body.types || req.query.types;
        if (!reqParam || !Array.isArray(reqParam) || reqParam.length === 0) {
            return createInternalResponse(false, statusCode.HTTP.BAD_REQUEST, "No master types specified", null);
        }
        const dbRes = await getMasterData_Dao(reqParam);
        return createInternalResponse(true, statusCode.HTTP.OK, "Master Data fetch success", dbRes.data);

    }, "getAllZones_model"
);

export const getLocation_Model = AsyncModelTryCatch(
    async (req: Request): Promise<any> => {
        const { zoneId, wardId } = req.query;

        if (!zoneId && !wardId) {
            const zones = await fetchAllZones_Dao();
            return createInternalResponse(true, statusCode.HTTP.OK, "Fetch zone success", { type: "zones", locations: zones.data });
        }

        if (zoneId && !wardId) {
            const wards = await fetchWardsByZone_Dao(Number(zoneId));
            return createInternalResponse(true, statusCode.HTTP.OK, "Fetch ward success", { type: "wards", locations: wards.data });
        }

        if (wardId) {
            const prabhags = await fetchPrabhagsByWard_Dao(Number(wardId));
            return createInternalResponse(true, statusCode.HTTP.OK, "Fetch prabhags success", { type: "prabhags", locations: prabhags.data });
        }

        return createInternalResponse(true, statusCode.HTTP.OK, "Master Data fetch success", null);

    }, "getAllZones_model"
)