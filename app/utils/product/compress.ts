import pako from "pako";
import type { Product } from "~/types/product";

/**
 * Compresses the provided products.
 * 1. Converts the products object to a JSON string.
 * 2. Compresses the JSON string.
 * 3. Encodes the compressed string to Base64 format.
 */
export const compressProducts = (products: Product[]): string | null => {
    try {
        // Convert products object to JSON string
        const jsonString = JSON.stringify(products);

        // Convert JSON string to Uint8Array
        const uint8Array = new TextEncoder().encode(jsonString);

        // Compress
        const compressedData = pako.deflate(uint8Array, { level: 9 });

        // Convert compressed data to Base64 string
        const base64String = btoa(String.fromCharCode(...compressedData));

        return base64String;
    } catch (error) {
        console.error("Compression failed:", error);
        return null;
    }
};
