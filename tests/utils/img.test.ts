import { describe, expect, it } from "vitest";
import { Category } from "~/types/category";
import { getImagePath } from "~/utils/img/path";

describe("getImagePath", () => {
    it("returns correct image path for category and name", () => {
        expect(getImagePath(Category.STARTERS, "bruschetta")).toBe(
            "/images/products/starters/bruschetta.png",
        );
        expect(getImagePath(Category.SALADS, "caesar")).toBe(
            "/images/products/salads/caesar.png",
        );
        expect(getImagePath(Category.SOUPS, "tomato")).toBe(
            "/images/products/soups/tomato.png",
        );
        expect(getImagePath(Category.ENTREES, "steak")).toBe(
            "/images/products/entrees/steak.png",
        );
        expect(getImagePath(Category.SIDES, "fries")).toBe(
            "/images/products/sides/fries.png",
        );
        expect(getImagePath(Category.DESSERTS, "cheesecake")).toBe(
            "/images/products/desserts/cheesecake.png",
        );
        expect(getImagePath(Category.BEVERAGES, "coffee")).toBe(
            "/images/products/beverages/coffee.png",
        );
    });
});
