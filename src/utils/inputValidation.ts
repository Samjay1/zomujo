import Joi from "joi";
import {
    RequestHandler, Request, Response, NextFunction
  } from "express"

const getMessageFromJoiError = (error : Joi.ValidationError, res: Response) => {
    if (!error.details && error.message) {
      return res.status(500).json({
        url : "src/utils/inputValidation",
        error : error.message
      })
    }
    return error.details && error.details.length > 0 && error.details[0].message
      ? 
      res.status(500).json({
        error : `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}` 
      }):
      res.status(501).json({
        error : undefined
      })
  };

const inputValidation = (req : Request, res: Response, next : NextFunction, 
    validation : Joi.ObjectSchema)=>{
    if (validation) {
        const { error } = validation.validate(req.body);
        if (error != null) {
          return next(getMessageFromJoiError(error, res));
        }
      }
}

export default inputValidation