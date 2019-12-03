import { ErrorMessage } from './error.message';

export class BaseResponse {
    data: any;
    error: string;
    code: number;
    constructor(data: any, error: string = null, code: number = 200) {
        this.data = data;
        this.error = error;
        this.code = code;
    }
}
