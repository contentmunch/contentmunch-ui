const first = (agent: string, choices: [RegExp, string][]) => choices.find(([pattern]) => pattern.test(agent))?.[1];

/**
 * A name for "this device" that tells passkeys apart in the browser's own list: the browser and system it is made on ("Safari on Mac").
 * Order matters: Edge and Chrome both say Chrome, and every Android and iPhone browser says Safari or Mozilla.
 */
export const deviceLabel = (agent: string = typeof navigator === "undefined" ? "" : navigator.userAgent): string => {
    const browser = first(agent, [[/Edg\//, "Edge"], [/OPR\/|Opera/, "Opera"], [/Firefox|FxiOS/, "Firefox"], [/Chrome|CriOS/, "Chrome"], [/Safari/, "Safari"]]);
    const system = first(agent, [[/iPhone/, "iPhone"], [/iPad/, "iPad"], [/Android/, "Android"], [/Mac OS X|Macintosh/, "Mac"], [/Windows/, "Windows"], [/CrOS/, "Chromebook"], [/Linux/, "Linux"]]);
    if (browser && system) return `${browser} on ${system}`;
    return browser ?? system ?? "This device";
};
