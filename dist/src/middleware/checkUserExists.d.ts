import { NextFunction, Request, Response } from "express";
export declare const checkUserExists: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
