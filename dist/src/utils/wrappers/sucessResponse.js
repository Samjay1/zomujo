"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    constructor(data, statusCode, message = "request succeeded") {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=sucessResponse.js.map