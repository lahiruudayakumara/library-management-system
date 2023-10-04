import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }
  log(message: string, ...optionalParams: any[]): void {
    if (isDevMode()) {
      console.log(message, ...optionalParams);
    }
  }

  warn(message: string, ...optionalParams: any[]): void {
    if (isDevMode()) {
      console.warn(message, ...optionalParams);
    }
  }

  error(message: string, ...optionalParams: any[]): void {
    if (isDevMode()) {
      console.error(message, ...optionalParams);
    }
  }

  debug(message: string, ...optionalParams: any[]): void {
    if (isDevMode()) {
      console.debug(message, ...optionalParams);
    }
  }
}
