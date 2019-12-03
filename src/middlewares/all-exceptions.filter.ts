import { BaseExceptionFilter } from '@nestjs/core';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseResponse } from '../data/base.response';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (exception instanceof HttpException) {
        response.status(exception.getStatus()).json(new BaseResponse(null, exception.message.error, exception.getStatus()));
    } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new BaseResponse(null, 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }
}
