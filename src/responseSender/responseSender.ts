import { NextFunction, Request, Response } from "express";
import clientResponse from "./clientResponse";

export const responseSenderMiddleware = (
  clientResponse: clientResponse,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = clientResponse.status || 500;
  const message = clientResponse.message || "Something went wrong";

  response.status(status).json({
    message: message,
    ...Object.fromEntries(Object.entries(clientResponse).slice(2)),
  });
};
