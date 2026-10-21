export interface DonutSlice {
    title: string;
    value: number;
    color: string;
    percent: number;
    startAngle: number;
    endAngle: number;
    path: string;
}

const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {x: cx + r * Math.cos(angleInRadians), y: cy + r * Math.sin(angleInRadians)};
};

// Standard SVG donut-slice path generator: an outer arc, a line in to the
// inner radius, an inner arc back, and a closing line. Angles are clamped
// just short of a full 360 degrees for a single-slice (100%) chart, since
// the arc commands can't express a truly closed circle in one path.
const arcPath = (cx: number, cy: number, outerR: number, innerR: number, startAngle: number, endAngle: number): string => {
    const clampedEnd = Math.min(endAngle, startAngle + 359.99);
    const startOuter = polarToCartesian(cx, cy, outerR, clampedEnd);
    const endOuter = polarToCartesian(cx, cy, outerR, startAngle);
    const startInner = polarToCartesian(cx, cy, innerR, clampedEnd);
    const endInner = polarToCartesian(cx, cy, innerR, startAngle);
    const largeArc = clampedEnd - startAngle > 180 ? 1 : 0;
    return [
        `M ${startOuter.x} ${startOuter.y}`,
        `A ${outerR} ${outerR} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}`,
        `L ${endInner.x} ${endInner.y}`,
        `A ${innerR} ${innerR} 0 ${largeArc} 1 ${startInner.x} ${startInner.y}`,
        "Z",
    ].join(" ");
};

export const buildDonutSlices = (
    values: { title: string; value: number; color: string }[],
    cx: number,
    cy: number,
    outerR: number,
    innerR: number,
): DonutSlice[] => {
    const total = values.reduce((sum, v) => sum + v.value, 0);
    if (total <= 0) return [];

    let angle = 0;
    return values.map(v => {
        const percent = v.value / total;
        const startAngle = angle;
        const endAngle = angle + percent * 360;
        angle = endAngle;
        return {
            title: v.title,
            value: v.value,
            color: v.color,
            percent,
            startAngle,
            endAngle,
            path: arcPath(cx, cy, outerR, innerR, startAngle, endAngle),
        };
    });
};
