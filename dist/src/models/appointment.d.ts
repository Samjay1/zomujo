import { Therapist } from "./therapist";
import { User } from "./user";
import { Payment } from "./payment";
import { Note } from "./note";
export declare class Appointment {
    id: string;
    scheduledTime: Date;
    durationMinutes: number;
    status: string;
    additionalInformation?: string;
    therapist: Therapist;
    user: User;
    payments?: Payment[];
    notes?: Note[];
}
