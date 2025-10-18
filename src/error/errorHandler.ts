import { Request, Response, NextFunction } from "express";

interface ValidationError {
  param: string;
  msg: string;
}

interface CustomError extends Error {
  status?: number;
  errors?: ValidationError[];
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.status !== 404) {
    // Only log non-404 errors
    console.error(err);
  }
  res.status(err.status || 500).json({
    success: 0,
    message: err.message || "Server Error",
    timestamp: new Date(),
    path: req.originalUrl,
    // no stack trace in production
  });
};


export default errorHandler;
