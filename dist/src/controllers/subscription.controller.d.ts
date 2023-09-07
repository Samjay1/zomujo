import { Request, Response } from "express";
export declare const createPlan: (req: Request, res: Response) => Promise<void>;
export declare const initiatePayment: (req: Request, res: Response) => Promise<void>;
export declare const paystackWebhook: (req: Request, res: Response) => Promise<void>;
export declare const verifyPayment: (reference: string) => Promise<any>;
