import type { Category } from "~/types/category";
import { stringifyCategory } from "~/utils/category/stringify";

/**
 * Get images from public folder
 */
export function getImagePath(category: Category, name: string): string {
    const categoryName = stringifyCategory(category).toLowerCase();
    return `/images/products/${categoryName}/${name}.png`;
}
