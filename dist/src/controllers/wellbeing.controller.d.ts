import { Request, Response } from "express";
export declare function getQuestions(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getResults(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getUserTestHistory(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
