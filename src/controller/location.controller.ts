import { Request, Response, NextFunction } from "express";
import { fetchAllZones, fetchWardsByZone, fetchPrabhagsByWard } from "../services/location.service";
import { successResponse } from "../shared/successResponse";

export async function getLocation(req: Request, res: Response, next: NextFunction) {
  try {
    const { zoneId, wardId } = req.query;

    if (!zoneId && !wardId) {
      const zones = await fetchAllZones();
      return successResponse(res,{ type: "zones", locations: zones });
    }

    if (zoneId && !wardId) {
      const wards = await fetchWardsByZone(Number(zoneId));
      return successResponse(res,{ type: "wards", locations: wards });
    }

    if (wardId) {
      const prabhags = await fetchPrabhagsByWard(Number(wardId));
      return successResponse(res,{ type: "prabhags", locations: prabhags });
    }

    // If none of the above conditions match, handle it:
    return res.status(400).json({ message: "Invalid parameters" });

  } catch (error) {
    return next(error);
  }
}

