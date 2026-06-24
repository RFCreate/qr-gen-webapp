import type { Cart } from "~/types/cart";
import { STORAGE_CURRENT_KEY } from "~/utils/config";
import { getAllCartKeys } from "~/utils/storage/get";

/**
 * Set cart list to local storage
 */
export function setCart(key: string, value: Cart): void {
    const allKeys = getAllCartKeys();

    // Only set list if the key exists in the list
    if (!allKeys.includes(key)) {
        return;
    }
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Set the current cart key in local storage
 */
export function setCurrentCartKey(key: string): void {
    const currentKey = STORAGE_CURRENT_KEY;
    localStorage.setItem(currentKey, key);
}

/**
 * Set the current cart list in local storage based on the current cart key
 */
export function setCurrentCart(cart: Cart): void {
    const currentKey = STORAGE_CURRENT_KEY;
    const key = localStorage.getItem(currentKey);
    if (!key) return;
    setCart(key, cart);
}
