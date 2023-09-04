export class SuccessResponse<T> {
    constructor(data: T, statusCode: number, message: string = "request succeeded") {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
    }
    data: T;
    statusCode: number;
    message: string;
}