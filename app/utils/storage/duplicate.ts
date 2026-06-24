import { createCartKey } from "~/utils/storage/create";
import { getCart } from "~/utils/storage/get";
import { setCart } from "~/utils/storage/set";

/**
 * Duplicate cart in storage
 */
export function duplicateCart(key: string): string | null {
    const cart = getCart(key);
    if (!cart) {
        return null;
    }
    const newKey = createCartKey();
    cart.title = `${cart.title} (copy)`;
    setCart(newKey, cart);
    return newKey;
}
