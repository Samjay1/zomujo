import e, { Request, Response, NextFunction } from "express";
declare const addCategory: (req: Request, res: Response, next: NextFunction) => Promise<e.Response<any, Record<string, any>>>;
export { addCategory };
