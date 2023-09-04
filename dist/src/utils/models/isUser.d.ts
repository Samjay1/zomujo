import { User } from "../../models/user";
declare const isUser: (id: string) => Promise<User | null | undefined>;
export default isUser;
