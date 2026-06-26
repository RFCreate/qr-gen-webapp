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
    it("write name in human-readable format", () => {
        expect(getProductName("espresso")).toBe("Espresso");
        expect(getProductName("cup_of_the_tea")).toBe("Cup of the Tea");
        expect(getProductName("the_good_and_bad")).toBe("The Good and Bad");
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
