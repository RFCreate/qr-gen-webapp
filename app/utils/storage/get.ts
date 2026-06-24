import type { Cart } from "~/types/cart";
import { STORAGE_CURRENT_KEY, STORAGE_MASTER_KEY } from "~/utils/config";

/**
 * Get cart item from local storage
 */
export function getCart(key: string): Cart | null {
    try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as Cart) : null;
    } catch (error) {
        console.error("Error parsing cart item from local storage:", error);
        return null;
    }
}

/**
 * Get the current cart key from local storage
 */
export function getCurrentCartKey(): string | null {
    const currentKey = STORAGE_CURRENT_KEY;
    return localStorage.getItem(currentKey);
}

/**
 * Get the current cart list from local storage
 * @returns The current cart list or null if not found
 */
export function getCurrentCart(): Cart | null {
    const currentCartKey = getCurrentCartKey();
    if (!currentCartKey) return null;

    return getCart(currentCartKey);
}

/**
 * Get all cart item keys from local storage
 */
export function getAllCartKeys(): string[] {
    const masterKey = STORAGE_MASTER_KEY;
    const keys = localStorage.getItem(masterKey);
    return keys ? keys.split(",") : [];
}
