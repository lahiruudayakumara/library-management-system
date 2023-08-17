import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    // Extending Request interface to include custom properties
    interface Request {
      user?: { 
        id: string;
        role: string;
        [key: string]: any; // Additional dynamic properties if needed
      };
    }
    interface Response {
      successResponse<T>(message: string, data?: T, statusCode?: number): this;
      errorResponse(message: string, statusCode?: number): this;
    }
  }
}
