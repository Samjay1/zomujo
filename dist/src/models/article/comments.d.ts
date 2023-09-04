import { Content } from './content';
import { User } from '../user';
export declare class Comments {
    id: string;
    user: User;
    text: string;
    date: Date;
    content: Content;
}
