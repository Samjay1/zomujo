import e, { Request, Response, NextFunction } from "express";
declare const updateCategory: (req: Request, res: Response, next: NextFunction) => Promise<e.Response<any, Record<string, any>> | undefined>;
export { updateCategory };
