import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Cart } from "~/types/cart";
import type { Product } from "~/types/product";
import { STORAGE_CURRENT_KEY, STORAGE_MASTER_KEY } from "~/utils/config";
import * as storageCreate from "~/utils/storage/create";
import * as storageDelete from "~/utils/storage/delete";
import * as storageDuplicate from "~/utils/storage/duplicate";
import * as storageGet from "~/utils/storage/get";
import * as storageInsert from "~/utils/storage/insert";
import * as storageSet from "~/utils/storage/set";

const CART: Cart = { title: "Cart", products: [] };
const NEW_CART: Cart = { title: "New Cart", products: [] };
const PRODUCT: Product = { n: "product", q: 1, c: 0 };

// Mock localStorage
global.localStorage = {
    store: {} as Record<string, string>,
    getItem(key: string) {
        return this.store[key] ?? null;
    },
    setItem(key: string, value: string) {
        this.store[key] = value;
    },
    removeItem(key: string) {
        delete this.store[key];
    },
    clear() {
        this.store = {};
    },
    key(index: number) {
        return Object.keys(this.store)[index] ?? null;
    },
    get length() {
        return Object.keys(this.store).length;
    },
} as Storage;

describe("storage utils", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        localStorage.clear();
        vi.resetModules();
    });

    describe("getCart", () => {
        it("returns null if item not found", () => {
            expect(storageGet.getCart("missing")).toBeNull();
        });
        it("returns parsed item if found", () => {
            localStorage.setItem("foo", JSON.stringify(CART));
            expect(storageGet.getCart("foo")).toEqual(CART);
        });
        it("handles JSON parse errors", () => {
            localStorage.setItem("bad", "not json");
            const consoleErrorSpy = vi
                .spyOn(console, "error")
                .mockImplementation(() => {});
            expect(storageGet.getCart("bad")).toBeNull();
            expect(consoleErrorSpy).toHaveBeenCalled();
        });
    });

    describe("getCurrentCartKey", () => {
        it("returns null if no current key", () => {
            expect(storageGet.getCurrentCartKey()).toBeNull();
        });
        it("returns current key if set", () => {
            storageSet.setCurrentCartKey("current");
            expect(storageGet.getCurrentCartKey()).toBe("current");
        });
    });

    describe("getCurrentCart", () => {
        it("returns null if no current key", () => {
            expect(storageGet.getCurrentCart()).toBeNull();
        });
        it("returns null if current key has no cart", () => {
            storageSet.setCurrentCartKey("missing");
            expect(storageGet.getCurrentCart()).toBeNull();
        });
        it("returns current cart list if key is valid", () => {
            localStorage.setItem("currentCart", JSON.stringify(CART));
            storageSet.setCurrentCartKey("currentCart");
            expect(storageGet.getCurrentCart()).toEqual(CART);
        });
    });

    describe("getAllCartKeys", () => {
        it("returns empty array if no keys", () => {
            expect(storageGet.getAllCartKeys()).toEqual([]);
        });
        it("returns keys from localStorage", () => {
            localStorage.setItem(STORAGE_MASTER_KEY, "a,b,c");
            expect(storageGet.getAllCartKeys()).toEqual(["a", "b", "c"]);
        });
    });

    describe("createCartKey", () => {
        it("generates and stores a new key", () => {
            expect(storageCreate.createCartKey()).toMatch(/^list-\d+$/);
            const keys = localStorage.getItem(STORAGE_MASTER_KEY);
            expect(keys).toMatch(/^list-\d+$/);
        });
    });

    describe("setCart", () => {
        it("sets value if key exists", () => {
            localStorage.setItem(STORAGE_MASTER_KEY, "foo");
            vi.spyOn(storageGet, "getAllCartKeys").mockReturnValue(["foo"]);
            storageSet.setCart("foo", CART);
            expect(localStorage.getItem("foo")).toBe(JSON.stringify(CART));
        });
        it("does not set if key missing", () => {
            vi.spyOn(storageGet, "getAllCartKeys").mockReturnValue([]);
            storageSet.setCart("bar", CART);
            expect(localStorage.getItem("bar")).toBeNull();
        });
    });

    describe("setCurrentCartKey", () => {
        it("sets the current cart key", () => {
            storageSet.setCurrentCartKey("foo");
            expect(localStorage.getItem(STORAGE_CURRENT_KEY)).toBe("foo");
        });
    });

    describe("setCurrentCart", () => {
        it("sets current cart list if current key exists", () => {
            localStorage.setItem(STORAGE_MASTER_KEY, "foo");
            vi.spyOn(storageGet, "getAllCartKeys").mockReturnValue(["foo"]);
            storageSet.setCart("foo", CART);
            storageSet.setCurrentCartKey("foo");
            storageSet.setCurrentCart(NEW_CART);
            expect(localStorage.getItem("foo")).toBe(JSON.stringify(NEW_CART));
        });
        it("does nothing if no current key", () => {
            localStorage.setItem("foo", JSON.stringify(CART));
            storageSet.setCurrentCart(NEW_CART);
            expect(localStorage.getItem("foo")).toBe(JSON.stringify(CART));
        });
    });

    describe("deleteCart", () => {
        it("removes key from storage and updates list", () => {
            localStorage.setItem(STORAGE_MASTER_KEY, "foo,bar");
            localStorage.setItem("foo", "data");
            localStorage.setItem("bar", "data2");
            storageSet.setCurrentCartKey("foo");
            vi.spyOn(storageGet, "getAllCartKeys").mockReturnValue([
                "foo",
                "bar",
            ]);
            storageDelete.deleteCart("foo");
            expect(localStorage.getItem("foo")).toBeNull();
            expect(localStorage.getItem(STORAGE_MASTER_KEY)).toBe("bar");
            expect(localStorage.getItem(STORAGE_CURRENT_KEY)).toBeNull();
        });
        it("removes storage key if last item", () => {
            localStorage.setItem(STORAGE_MASTER_KEY, "foo");
            localStorage.setItem("foo", "data");
            vi.spyOn(storageGet, "getAllCartKeys").mockReturnValue(["foo"]);
            storageDelete.deleteCart("foo");
            expect(localStorage.getItem(STORAGE_MASTER_KEY)).toBeNull();
        });
    });

    describe("insertProduct", () => {
        it("inserts item into current cart list", () => {
            localStorage.setItem(STORAGE_MASTER_KEY, "foo");
            localStorage.setItem("foo", JSON.stringify(CART));
            storageSet.setCurrentCartKey("foo");
            storageInsert.insertProduct(PRODUCT);
            expect(localStorage.getItem("foo")).toBe(
                JSON.stringify({
                    title: "Cart",
                    products: [PRODUCT],
                }),
            );
        });
        it("does nothing if no current cart list", () => {
            storageSet.setCurrentCartKey("missing");
            storageInsert.insertProduct(PRODUCT);
            expect(localStorage.getItem("missing")).toBeNull();
        });
        it("increases quantity if identical product exists", () => {
            localStorage.setItem(STORAGE_MASTER_KEY, "foo");
            localStorage.setItem(
                "foo",
                JSON.stringify({
                    title: "Cart",
                    products: [PRODUCT],
                }),
            );
            storageSet.setCurrentCartKey("foo");
            storageInsert.insertProduct(PRODUCT);
            const updated = JSON.parse(localStorage.getItem("foo") || "{}");
            expect(updated.products).toHaveLength(1);
            expect(updated.products[0].q).toBe(2);
        });
    });

    describe("duplicateCart", () => {
        it("duplicates cart and returns new key", () => {
            localStorage.setItem(STORAGE_MASTER_KEY, "foo");
            localStorage.setItem("foo", JSON.stringify(CART));
            const newKey = storageDuplicate.duplicateCart("foo") as string;
            expect(newKey).not.toBeNull();
            expect(localStorage.getItem(newKey)).toBe(
                JSON.stringify({ title: "Cart (copy)", products: [] }),
            );
        });
        it("returns null if original cart not found", () => {
            expect(storageDuplicate.duplicateCart("missing")).toBeNull();
        });
    });
});
