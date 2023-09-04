export declare class SuccessResponse<T> {
    constructor(data: T, statusCode: number, message?: string);
    data: T;
    statusCode: number;
    message: string;
}
