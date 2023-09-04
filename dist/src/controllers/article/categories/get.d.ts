import { Response, Request, NextFunction } from "express";
declare const getCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getAllCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { getCategory, getAllCategories };
