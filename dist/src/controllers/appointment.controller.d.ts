import { Response, Request } from "express";
export declare function bookAppointment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function allAppointmentTherapist(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function allAppointmentUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function manageAppointment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getSingleAppointment(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
