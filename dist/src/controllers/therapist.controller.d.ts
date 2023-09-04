import { Request, Response } from "express";
export declare const signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const signin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTherapistInformation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTherapistData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTherapistProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
