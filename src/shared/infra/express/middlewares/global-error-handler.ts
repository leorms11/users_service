import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = async (
  err,
  _req,
  res,
  _next
) => {
  return res
    .status(err.httpStatusCode || err.status || 500)
    .json({ name: err.name, message: err.message });
};
