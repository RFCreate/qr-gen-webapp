import { Category } from "~/types/category";

/**
 * Get the string representation of a category
 */
export function stringifyCategory(category: Category): string {
    const name = Category[category];
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
