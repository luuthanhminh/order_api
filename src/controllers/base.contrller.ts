import { BaseResponse } from '../data/base.response';
import { Response } from 'express';

export abstract class BaseController {
    handleResult(res: Response, result: BaseResponse) {
        res.status(result.code).json(result);
    }
}
