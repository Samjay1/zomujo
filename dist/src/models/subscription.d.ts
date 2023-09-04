import { User } from "./user";
export declare class Subscription {
    id: string;
    subscriptionType: string;
    price: number;
    startDate: Date;
    endDate: Date;
    user: User;
}
