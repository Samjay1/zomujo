"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMessageFromJoiError = (error, res) => {
    if (!error.details && error.message) {
        return res.status(500).json({
            url: "src/utils/inputValidation",
            error: error.message
        });
    }
    return error.details && error.details.length > 0 && error.details[0].message
        ?
            res.status(500).json({
                error: `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}`
            }) :
        res.status(501).json({
            error: undefined
        });
};
const inputValidation = (req, res, next, validation) => {
    if (validation) {
        const { error } = validation.validate(req.body);
        if (error != null) {
            return next(getMessageFromJoiError(error, res));
        }
    }
};
exports.default = inputValidation;
//# sourceMappingURL=inputValidation.js.map