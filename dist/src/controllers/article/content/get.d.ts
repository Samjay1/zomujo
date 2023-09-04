import { Response, Request, NextFunction } from "express";
export declare const getContent: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllContent: (req: Request, res: Response) => Promise<void>;
