import { Category } from "../../models/article/categories";
declare const isCategory: (id: string) => Promise<Category | null>;
export default isCategory;
