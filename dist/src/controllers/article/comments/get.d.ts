import { Response, Request, NextFunction } from "express";
declare const getComment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getAllComments: (req: Request, res: Response) => Promise<void>;
export { getComment, getAllComments };
