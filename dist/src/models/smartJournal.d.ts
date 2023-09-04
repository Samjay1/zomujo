import { User } from './user';
import { BaseModel } from '../utils/BaseModel';
export declare class JournalEntry extends BaseModel {
    userId: string;
    entry: string;
    prompt: string;
    user: User;
}
