import { NextFunction, Request, Response } from "express";

import logger from "../utils/logger";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ success: false, message: "An internal server error occurred" });
};

export default errorHandler;
