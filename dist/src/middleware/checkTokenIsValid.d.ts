import { NextFunction, Request, Response } from "express";
export declare const checkTokenIsValid: (req: Request, res: Response, next: NextFunction) => Promise<void>;
