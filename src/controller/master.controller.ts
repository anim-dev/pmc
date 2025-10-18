import { Request, Response, NextFunction } from "express";
import { getMasterData } from "../services/master.service";
import { successResponse } from "../shared/successResponse";

export async function masterDataController(req: Request, res: Response, next: NextFunction) {
  try {
    const types: string[] = req.body.types || req.query.types;
    if (!types || !Array.isArray(types) || types.length === 0) {
      return res.status(400).json({ message: "No master types specified." });
    }
    const data = await getMasterData(types);
    return successResponse(res,data);
  } catch (error) {
    return next(error);
  }
}
