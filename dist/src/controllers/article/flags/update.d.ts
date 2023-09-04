import { Request, Response, NextFunction } from "express";
declare const updateFlag: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export { updateFlag };
