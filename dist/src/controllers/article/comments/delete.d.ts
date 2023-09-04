import e, { Request, Response, NextFunction } from "express";
declare const deleteComment: (req: Request, res: Response, next: NextFunction) => Promise<e.Response<any, Record<string, any>>>;
export { deleteComment };
