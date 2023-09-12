// import { Response } from 'express';

// // Extend the Response interface to include custom methods
// declare module 'express-serve-static-core' {
//     interface Response {
//       successResponse<T>(message: string, data?: T, statusCode?: number): Response;
//       errorResponse(message: string, statusCode?: number): Response;
//     }
//   }
  
// // Extend the Response interface to include custom methods
// export function successResponse<T>(this: Response, message: string, data?: T, statusCode: number = 200): Response {
//   return this.status(statusCode).json({
//     success: true,
//     message,
//     data,
//   });
// }

// export function errorResponse(this: Response, message: string, statusCode: number = 500): Response {
//   return this.status(statusCode).json({
//     success: false,
//     message,
//   });
// }

// // Assign these methods to Response prototype
// Response.prototype.successResponse = successResponse;
// Response.prototype.errorResponse = errorResponse;
