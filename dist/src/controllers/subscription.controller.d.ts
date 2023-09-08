import { Request, Response } from "express";
export declare const createPlan: (req: Request, res: Response) => Promise<void>;
export declare const initiatePayment: (req: Request, res: Response) => Promise<void>;
export declare const verifyPayment: (reference: string) => Promise<void>;
export declare const populateDummyData: (req: Request, res: Response) => Promise<void>;
