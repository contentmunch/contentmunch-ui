import type {Color} from "./Dataset.ts";

const PALETTE_SIZE = 8;

export const isHex = (color: string): color is `#${string}` => /^#[0-9a-fA-F]{6}$/.test(color);

export const isColor = (color: unknown): color is Color =>
    typeof color === "string" && (isHex(color) || /^([1-8]|good|bad|warn|info|neutral)$/.test(color));

/**
 * What each color token is. The first seven are the palette the charts have always used, in their order; the eighth and the
 * meanings are new.
 */
export const TOKEN_HEX: Record<Exclude<Color, `#${string}`>, string> = {
    "1": "#4e79a7", "2": "#59a14f", "3": "#f28e2c", "4": "#e15759", "5": "#261759", "6": "#acd643", "7": "#daf2dc", "8": "#76b7b2",
    good: "#59a14f", bad: "#e15759", warn: "#f28e2c", info: "#4e79a7", neutral: "#a0a7b4",
};

/** The color to draw with: a token's value, or the `#rrggbb` the person chose. */
export const colorHex = (color: Color): string => (isHex(color) ? color : TOKEN_HEX[color]);

/**
 * A color for every key. Pinned keys keep what they were given; the others take the series palette in the order the values first
 * appear in the data, as the charts before this did, so the order the rows are given in is the order of the colors. Put the
 * categories that matter in a fixed place, or pin them.
 */
export const assignColors = (keys: string[], pinned: Record<string, Color> = {}): Map<string, Color> => {
    const colors = new Map<string, Color>();
    const unpinned = [...new Set(keys)].filter((k) => pinned[k] === undefined);
    unpinned.forEach((key, index) => colors.set(key, String((index % PALETTE_SIZE) + 1) as Color));
    for (const key of new Set(keys)) if (pinned[key] !== undefined) colors.set(key, pinned[key]);
    return colors;
};
