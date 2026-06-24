import { STORAGE_CURRENT_KEY, STORAGE_MASTER_KEY } from "~/utils/config";
import { getAllCartKeys } from "~/utils/storage/get";

/**
 * Delete cart item from localStorage by key.
 */
export function deleteCart(key: string): void {
    const masterKey = STORAGE_MASTER_KEY;
    const allKeys = getAllCartKeys();

    // Filter out the key to be deleted and update local storage
    const updatedKeys = allKeys.filter((k) => k !== key);

    // Update or remove the storage key
    if (updatedKeys.length > 0) {
        localStorage.setItem(masterKey, updatedKeys.join(","));
    } else {
        localStorage.removeItem(masterKey);
    }

    // If the deleted key is the current cart key, remove it from local storage
    const currentKey = STORAGE_CURRENT_KEY;
    if (currentKey && localStorage.getItem(currentKey) === key) {
        localStorage.removeItem(currentKey);
    }

    localStorage.removeItem(key);
}
