export class ErrorMessage {
    errorMessage: string;
    errorCode: number;
    constructor(message: string, code: number) {
        this.errorMessage = message;
        this.errorCode = code;
    }
}
