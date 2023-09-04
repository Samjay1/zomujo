import { Response, Request, NextFunction } from "express";
declare const getFlag: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getAllFlags: (req: Request, res: Response) => Promise<void>;
export { getFlag, getAllFlags };
