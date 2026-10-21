import type {VisualizationSize} from "../dataset/Dataset.ts";

/**
 * One rule sizes every kind: the same factor scales each from its medium size, the size the charts have always been (a 220px ring;
 * bars as wide as the container allows, up to 720px).
 */
export const FACTOR: Record<VisualizationSize, number> = { small: 0.75, medium: 1, large: 1.15 };

const MEDIUM_DIAMETER = 220;
const MEDIUM_BAR_WIDTH = 720;

export const diameterOf = (size: VisualizationSize): number => Math.round(MEDIUM_DIAMETER * FACTOR[size]);
export const barWidthOf = (size: VisualizationSize): number => Math.round(MEDIUM_BAR_WIDTH * FACTOR[size]);
