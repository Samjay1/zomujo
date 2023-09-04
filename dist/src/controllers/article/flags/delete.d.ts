import e, { Request, Response, NextFunction } from "express";
declare const deleteFlag: (req: Request, res: Response, next: NextFunction) => Promise<e.Response<any, Record<string, any>>>;
export { deleteFlag };
