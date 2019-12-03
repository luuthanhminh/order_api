import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseResponse } from '../data/base.response';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  // tslint:disable-next-line:ban-types
  use(req: Request, res: Response, next: Function) {
      try {
        next();
      } catch (e) {
          let response;
          if (e instanceof Error) {
            response = new BaseResponse(null, e.message, 500);
          } else {
            response = new BaseResponse(null, 'Internal server error', 500);
          }
          res.status(500).json(response);
      }
  }
}
