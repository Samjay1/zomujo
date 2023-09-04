import { Response, Request, NextFunction } from "express";
declare const getLikes: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getAllLikes: (req: Request, res: Response) => Promise<void>;
export { getLikes, getAllLikes };
