import pako from "pako";
import type { Product } from "~/types/product";

/**
 * Decompresses the provided products.
 * 1. Decodes the Base64 string to a compressed binary format.
 * 2. Decompresses the binary data.
 * 3. Parses the decompressed JSON string back into an object.
 */
export const decompressProducts = (base64String: string): Product[] | null => {
    try {
        // Decode Base64 to binary string
        const binaryString = atob(base64String);

        // Convert binary string to Uint8Array
        const uint8Array = Uint8Array.from(binaryString, (char) =>
            char.charCodeAt(0),
        );

        // Decompress
        const decompressedData = pako.inflate(uint8Array, { to: "string" });

        // Parse the decompressed JSON string back into an object
        const jsonString = JSON.parse(decompressedData);

        return jsonString as Product[];
    } catch (error) {
        console.error("Decompression failed:", error);
        return null;
    }
};
