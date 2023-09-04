import e, { Request, Response, NextFunction } from "express";
declare const deleteLikes: (req: Request, res: Response, next: NextFunction) => Promise<e.Response<any, Record<string, any>>>;
export { deleteLikes };
