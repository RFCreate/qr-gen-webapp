import type { Product } from "~/types/product";
import { NEW_PRODUCT_KEY } from "~/utils/config";
import { isProductEqual } from "~/utils/product/equal";
import { getCurrentCart } from "~/utils/storage/get";
import { setCurrentCart } from "~/utils/storage/set";

/**
 * Inserts a product into the current cart list in local storage
 */
export function insertProduct(product: Product): void {
    const currentCart = getCurrentCart();
    if (!currentCart) return;

    // Find if an identical product exists
    const existingIndex = currentCart.products.findIndex((p) =>
        isProductEqual(p, product),
    );

    let updatedProducts = [];
    if (existingIndex !== -1) {
        // Increase quantity of the existing product
        updatedProducts = currentCart.products.map((p, idx) =>
            idx === existingIndex ? { ...p, q: p.q + product.q } : p,
        );
    } else {
        // Add as new product
        updatedProducts = [...currentCart.products, product];
    }

    const updatedCart = {
        ...currentCart,
        products: updatedProducts,
    };
    setCurrentCart(updatedCart);
    localStorage.setItem(NEW_PRODUCT_KEY, "1");
}
