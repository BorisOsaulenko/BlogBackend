import { NextFunction, Request, Response } from "express";
import { CustomError } from "../customError/error";
import { ZodError } from "zod";

export const errorMiddleware = (
  error: ZodError | CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error instanceof CustomError ? error.status : 400;
  const message =
    error instanceof CustomError ? error.toastMessage : error.errors[0].message;

  console.log(error);

  response.status(status).json({
    toastMessage: message,
  });
};
