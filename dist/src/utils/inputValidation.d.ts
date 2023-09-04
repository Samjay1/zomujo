import Joi from "joi";
import { Request, Response, NextFunction } from "express";
declare const inputValidation: (req: Request, res: Response, next: NextFunction, validation: Joi.ObjectSchema) => void;
export default inputValidation;
