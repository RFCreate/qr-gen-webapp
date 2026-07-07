import { describe, expect, it } from "vitest";
import { Category } from "~/types/category";
import { stringifyCategory } from "~/utils/category/stringify";

describe("stringifyCategory", () => {
    it("returns correct category name for acronym", () => {
        expect(stringifyCategory(Category.STARTERS)).toBe("Starters");
        expect(stringifyCategory(Category.SALADS)).toBe("Salads");
        expect(stringifyCategory(Category.SOUPS)).toBe("Soups");
        expect(stringifyCategory(Category.ENTREES)).toBe("Entrees");
        expect(stringifyCategory(Category.SIDES)).toBe("Sides");
        expect(stringifyCategory(Category.DESSERTS)).toBe("Desserts");
        expect(stringifyCategory(Category.BEVERAGES)).toBe("Beverages");
    });
});
