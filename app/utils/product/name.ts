/**
 * Get formal name of product
 * 1. Uppercase first letter of each word in name (skip "the", "of", "and")
 * 2. Replace underscores with spaces
 */
export function getProductName(name: string): string {
    const words = name.split("_").map((word) => {
        if (["the", "of", "and"].includes(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return words.join(" ");
}
