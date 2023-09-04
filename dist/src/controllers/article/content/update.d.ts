import { Request, Response, NextFunction } from "express";
declare const updateContent: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export { updateContent };
