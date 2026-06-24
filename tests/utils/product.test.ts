import { describe, expect, it } from "vitest";
import type { Product } from "~/types/product";
import { compressProducts } from "~/utils/product/compress";
import { decompressProducts } from "~/utils/product/decompress";
import { isProductEqual } from "~/utils/product/equal";
import { getProductName } from "~/utils/product/name";

const PRODUCT: Product = { n: "product", q: 1 };
const PRODUCTS: Product[] = [PRODUCT];
const BASE64_CART = "eNqLrlbKU7JSKijKTylNLlHSUSpUsjKsjQUAV88HLg==";

describe("getProductName", () => {
    it("capitalizes words (except 'the', 'of', 'and') and replaces underscores", () => {
        expect(getProductName("espresso")).toBe("Espresso");
        expect(getProductName("cup_of_tea")).toBe("Cup of Tea");
        expect(getProductName("brave_and_the_bold")).toBe("Brave and the Bold");
    });
});

describe("isProductEqual", () => {
    it("returns true for identical products", () => {
        expect(isProductEqual(PRODUCT, PRODUCT)).toBe(true);
    });
    it("returns false for different names", () => {
        const newProduct: Product = { ...PRODUCT, n: "latte" };
        expect(isProductEqual(PRODUCT, newProduct)).toBe(false);
    });
});

describe("compressProducts", () => {
    it("compresses and encodes products to base64", () => {
        const result = compressProducts(PRODUCTS);
        expect(result).toBe(BASE64_CART);
    });
});

describe("decompressProducts", () => {
    it("decodes, decompresses, and parses products", () => {
        const result = decompressProducts(BASE64_CART);
        expect(result).toEqual(PRODUCTS);
    });
});
