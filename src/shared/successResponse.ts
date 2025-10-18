import { Response } from "express";

export function successResponse(res: Response, data: any, message: string = "Success") {
  const finalResponse = {
    success: 1,
    message,
    data,
  };
  res.send(finalResponse);
}
