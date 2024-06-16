/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // add function logic for middleware to run before send requset to server
    console.log(`Request...`,new Date().toDateString());
    next();
  }
}
