import { STORAGE_MASTER_KEY } from "~/utils/config";
import { getAllCartKeys } from "~/utils/storage/get";

/**
 * Create a unique key for cart item
 */
export function createCartKey(): string {
    const masterKey = STORAGE_MASTER_KEY;
    const allKeys = getAllCartKeys();

    const key = `list-${Date.now()}`;

    // Only add the key if it doesn't already exist to prevent duplicates
    if (!allKeys.includes(key)) {
        localStorage.setItem(masterKey, allKeys.concat(key).join(","));
    }

    return key;
}
