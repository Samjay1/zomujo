import { User } from "./user";
import { Appointment } from "./appointment";
export declare class Payment {
    id: string;
    amount: number;
    paymentDate: Date;
    user: User;
    appointment: Appointment;
}
