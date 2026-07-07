import type { Category } from "~/types/category";

export type Product = {
    /** Name of the product */
    n: string;
    /** Quantity of the product */
    q: number;
    /** Category of the product */
    c: Category;
};
