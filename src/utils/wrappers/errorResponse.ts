export class ErrorResponse {
    constructor(statusCode: number, message: string= "request failed") {
        this.statusCode = statusCode;
        this.message = message;
    }
    statusCode!: number
    message!: string
}