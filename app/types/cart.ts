import type { Product } from "~/types/product";

export type Cart = {
    /** Title of the cart */
    title: string;
    /** Products in the cart */
    products: Product[];
};
