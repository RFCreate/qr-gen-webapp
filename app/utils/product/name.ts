/**
 * Get human-readable product name
 * 1. Uppercase first letter of each word in name (skip "the", "of", "and")
 * 2. Replace underscores with spaces
 * 3. Uppercase first letter of the whole name
 */
export function getProductName(name: string): string {
    const words = name.split("_").map((word) => {
        if (["the", "of", "and"].includes(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const result = words.join(" ");
    return result.charAt(0).toUpperCase() + result.slice(1);
}
