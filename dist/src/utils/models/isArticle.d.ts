import { Content } from "../../models/article/content";
declare const isArticle: (id: string) => Promise<Content | null>;
export default isArticle;
