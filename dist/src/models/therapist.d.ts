import { Appointment } from "./appointment";
import { Profile } from "./profile";
export declare class Therapist {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    dateOfBirth?: Date;
    password: string;
    appointments?: Appointment[];
    profile?: Profile;
}
