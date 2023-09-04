import { Request, Response } from "express";
export declare const createSessionNote: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getSessionNotes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteNote: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
