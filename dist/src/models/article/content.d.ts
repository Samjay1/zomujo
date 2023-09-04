import { Category } from './categories';
import { Flags } from './flags';
import { Comments } from './comments';
import { User } from '../user';
export declare class Content {
    id: string;
    title: string;
    text: string;
    date: Date;
    author: User;
    category: Category[];
    flags?: Flags[];
    comments?: Comments[];
    likes?: Comments[];
}
