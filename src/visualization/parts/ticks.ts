/** Round tick values from zero to just past the maximum, about `count` of them. */
export const niceTicks = (max: number, count = 4): number[] => {
    if (max <= 0) return [0];
    const rough = max / count;
    const magnitude = 10 ** Math.floor(Math.log10(rough));
    const step = [1, 2, 2.5, 5, 10].map((f) => f * magnitude).find((s) => s >= rough) ?? magnitude * 10;
    const ticks: number[] = [];
    for (let v = 0; v <= max + step / 2; v += step) ticks.push(Number(v.toFixed(10)));
    return ticks;
};
