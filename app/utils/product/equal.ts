import type { Product } from "~/types/product";

/**
 * Checks if two products are equal by comparing their names.
 * @param a - The first product to compare.
 * @param b - The second product to compare.
 * @returns True if the products are equal, false otherwise.
 */
export function isProductEqual(a: Product, b: Product): boolean {
    return a.n === b.n;
}
