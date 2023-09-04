import { Appointment } from "./appointment";
import { Subscription } from "./subscription";
import { Payment } from "./payment";
import { Flags } from './article/flags';
import { Likes } from './article/likes';
import { Content } from './article/content';
import { Comments } from './article/comments';
import { TestResult } from './testResults';
import { JournalEntry } from "./smartJournal";
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    appointments?: Appointment[];
    subscriptions?: Subscription[];
    payments?: Payment[];
    flags?: Flags[];
    likes?: Likes[];
    content?: Content[];
    comments: Comments[];
    results?: TestResult[];
    journalEntries?: JournalEntry[];
}
