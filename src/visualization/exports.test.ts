import {describe, expect, it} from "vitest";
import {readdirSync, readFileSync, statSync} from "node:fs";
import {join, relative} from "node:path";
import * as library from "../index.ts";

const root = join(__dirname, "..");

const files = (dir: string, ext: string): string[] =>
    readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        return statSync(path).isDirectory() ? files(path, ext) : path.endsWith(ext) ? [path] : [];
    });

describe("what the library exposes for visualizations", () => {
    it("exports every chart, piece, drawing, helper and adapter", () => {
        const names = [
            "PieChart", "DonutChart", "BarChart", "LineChart", "KpiChart", "TableChart", "Visualization", "TimeSlider",
            "Figure", "Legend", "DataTable", "PiePlot", "DonutPlot", "BarPlot",
            "validateDataset", "validateFor", "formatValue", "formatTick", "isUnit", "fitting", "KINDS", "KIND_LABELS",
            "shapeOf", "periodsOf", "formatPeriod", "canonicalPeriod", "periodRange", "colorHex", "assignColors", "TOKEN_HEX",
            "radialModel", "barPlotInput", "lineModel", "kpiModel", "tableModel", "FACTOR", "diameterOf", "barWidthOf", "niceTicks",
        ];
        for (const name of names) expect((library as Record<string, unknown>)[name], name).toBeDefined();
    });

    it("exports every component a visualization file defines", () => {
        const defined = files(join(root, "visualization"), ".tsx")
            .filter((f) => !/\.(test|stories)\.tsx$/.test(f) && !f.endsWith("RadialChart.tsx"))
            .flatMap((f) => [...readFileSync(f, "utf8").matchAll(/^export const ([A-Z]\w+)\b/gm)].map((m) => m[1]));
        const missing = defined.filter((name) => !(name in library));
        expect(missing).toEqual([]);
    });

    it("imports every visualization stylesheet in index.css, so the one css file carries them all", () => {
        const index = readFileSync(join(root, "index.css"), "utf8");
        const sheets = files(join(root, "visualization"), ".css").map((f) => "./" + relative(root, f));
        expect(sheets.length).toBeGreaterThan(3);
        const missing = sheets.filter((sheet) => !index.includes(`'${sheet}'`) && !index.includes(`"${sheet}"`));
        expect(missing).toEqual([]);
    });
});
