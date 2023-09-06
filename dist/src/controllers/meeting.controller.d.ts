import { Request, Response } from "express";
export declare const createMeetingEvent: (auth: any, eventData: any) => Promise<void>;
export declare const createMeeting: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
