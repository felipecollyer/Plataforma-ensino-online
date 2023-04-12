import { NextFunction, Request, Response } from "express";
import { ApiError } from "../halpers/apiError";

export const ErrosMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = error.statusCode ? error.message : "Internal Server Error";
  const statusCode = error.statusCode ?? 500;
  return res.status(statusCode).json({ message });
};
