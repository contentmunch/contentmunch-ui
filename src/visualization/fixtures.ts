import type {Dataset} from "./dataset/Dataset.ts";

/** Datasets shared by the stories and the tests, shaped after what the apps draw today. */

/** Renaissance admin: how occupied the units are. Two parts, pinned colors. */
export const occupancy: Dataset = {
    title: "92% of units are occupied",
    summary: "Of 200 units, 184 are occupied and 16 are vacant.",
    columns: [
        { name: "status", role: "category", label: "Status", colors: { Occupied: "good", Vacant: "bad" } },
        { name: "units", role: "measure", unit: "count", label: "Units" },
    ],
    rows: [
        { status: "Occupied", units: 184 },
        { status: "Vacant", units: 16 },
    ],
};

/** Renaissance admin: the lease types of one property. */
export const leaseTypes: Dataset = {
    title: "Renewals are the biggest share of leases",
    summary: "Renewals 48, new 30, extensions 14, vacant 8.",
    columns: [
        { name: "type", role: "category", label: "Lease type" },
        { name: "leases", role: "measure", unit: "count", label: "Leases" },
    ],
    rows: [
        { type: "Renewal", leases: 48 },
        { type: "New", leases: 30 },
        { type: "Extension", leases: 14 },
        { type: "Vacant", leases: 8 },
    ],
};

/** Balance: one month of spending in nine categories, so the tail groups into "Other". */
export const spending: Dataset = {
    title: "Where it went in October",
    summary: "Spending for October 2026 by category, led by rent.",
    columns: [
        { name: "month", role: "time", grain: "month" },
        { name: "category", role: "category", label: "Category" },
        { name: "spent", role: "measure", unit: "currency:USD", label: "Spent" },
    ],
    rows: [
        { month: "2026-10", category: "Rent", spent: 1850 },
        { month: "2026-10", category: "Groceries", spent: 612.4 },
        { month: "2026-10", category: "Transport", spent: 240 },
        { month: "2026-10", category: "Utilities", spent: 198.5 },
        { month: "2026-10", category: "Dining", spent: 176 },
        { month: "2026-10", category: "Health", spent: 95 },
        { month: "2026-10", category: "Books", spent: 42 },
        { month: "2026-10", category: "Gifts", spent: 30 },
        { month: "2026-10", category: "Fees", spent: 12 },
        { month: "2026-09", category: "Rent", spent: 1850 },
        { month: "2026-09", category: "Groceries", spent: 580 },
    ],
};

const properties = ["Harbour", "Verona Park", "Scholars Quad", "High Grove", "Summer House"];
const leaseRows = (suffix: Record<string, number> = {}) =>
    properties.map((property, i) => ({
        property,
        New: 4 + i + (suffix.New ?? 0),
        Renewal: 9 - i + (suffix.Renewal ?? 0),
        Extension: 2 + (i % 2) + (suffix.Extension ?? 0),
        Vacant: 1 + (i % 3) + (suffix.Vacant ?? 0),
    }));

const leaseMeasures = (unit: "count" | "share") => [
    { name: "New", role: "measure" as const, unit },
    { name: "Renewal", role: "measure" as const, unit },
    { name: "Extension", role: "measure" as const, unit },
    { name: "Vacant", role: "measure" as const, unit },
];

/** Renaissance admin: leases by property, stacked by type. */
export const leasesByProperty: Dataset = {
    title: "Leases by property and type",
    summary: "Number of new, renewal, extension and vacant leases at each of five properties.",
    columns: [{ name: "property", role: "category", label: "Property" }, ...leaseMeasures("count")],
    rows: leaseRows(),
};

/** The occupancy bar chart: the same leases, each bar scaled to 100%. */
export const leaseMix: Dataset = {
    title: "Mix of lease types at each property",
    summary: "The share of new, renewal, extension and vacant leases at each of five properties.",
    columns: [{ name: "property", role: "category", label: "Property" }, ...leaseMeasures("share")],
    rows: leaseRows(),
};

/** The signed-date comparison report: two periods of the same properties, side by side, each stacked. */
export const comparison: Dataset = {
    title: "Leases signed per property, this year and last",
    summary: "Leases signed at each property in two date ranges, split by type.",
    columns: [
        { name: "property", role: "category", label: "Property" },
        { name: "range", role: "category", label: "Period" },
        ...leaseMeasures("count"),
    ],
    rows: [
        ...leaseRows().slice(0, 3).map((r) => ({ ...r, range: "Jan to Mar 2026" })),
        ...leaseRows({ New: 2, Renewal: -3 }).slice(0, 3).map((r) => ({ ...r, range: "Jan to Mar 2025" })),
    ],
};

/** One measure over three months for three regions: bars side by side. */
export const regionsByMonth: Dataset = {
    title: "Online overtook retail in March",
    summary: "Monthly sales by region from January to March 2026.",
    columns: [
        { name: "month", role: "time", grain: "month" },
        { name: "region", role: "category", label: "Region" },
        { name: "sales", role: "measure", unit: "currency:USD", label: "Sales" },
    ],
    rows: ["2026-01", "2026-02", "2026-03"].flatMap((month, m) => [
        { month, region: "North", sales: 120 + m * 30 },
        { month, region: "South", sales: 90 + m * 55 },
        { month, region: "West", sales: 60 + m * 10 },
    ]),
};

/** The same measure in two months: the bars compare them. */
export const twoMonths: Dataset = {
    title: "Sales by region, March against February",
    summary: "Sales in each of three regions in February and March 2026.",
    columns: [
        { name: "month", role: "time", grain: "month" },
        { name: "region", role: "category", label: "Region" },
        { name: "sales", role: "measure", unit: "currency:USD", label: "Sales" },
    ],
    rows: ["2026-02", "2026-03"].flatMap((month, m) => [
        { month, region: "North", sales: 150 + m * 30 },
        { month, region: "South", sales: 145 + m * 55 },
        { month, region: "West", sales: 70 + m * 10 },
    ]),
};

/** One measure across eight months: a line, or a KPI. */
export const monthlyRevenue: Dataset = {
    title: "Revenue grew every month this year",
    summary: "Monthly revenue from March to October 2026, rising from about 41 thousand to 72 thousand dollars.",
    columns: [
        { name: "month", role: "time", grain: "month" },
        { name: "revenue", role: "measure", unit: "currency:USD", label: "Revenue" },
    ],
    rows: [41200, 43850, 47100, 52400, 58900, 61250, 66800, 72300].map((revenue, i) => ({ month: `2026-${String(i + 3).padStart(2, "0")}`, revenue })),
};

/** Several measures over time: one line each. */
export const funnelByMonth: Dataset = {
    title: "More people finish the form each month",
    summary: "Monthly clicks, next steps and submissions of the contact form, January to June 2026.",
    columns: [
        { name: "month", role: "time", grain: "month" },
        { name: "Clicks", role: "measure", unit: "count" },
        { name: "Next step", role: "measure", unit: "count" },
        { name: "Submitted", role: "measure", unit: "count" },
    ],
    rows: [[120, 70, 30], [150, 88, 41], [170, 101, 49], [210, 140, 66], [240, 166, 90], [290, 204, 121]].map(([a, b, c], i) => ({
        month: `2026-${String(i + 1).padStart(2, "0")}`, Clicks: a, "Next step": b, Submitted: c,
    })),
};

const isoDay = (offset: number): string => new Date(Date.UTC(2026, 9, 1 + offset)).toISOString().slice(0, 10);

/** Thirty days of visits: a day grain, with two days missing. */
export const dailyVisits: Dataset = {
    title: "Visits dipped over the weekend of the 17th",
    summary: "Daily site visits in October 2026, with no data on the 12th and 13th.",
    columns: [
        { name: "day", role: "time", grain: "day" },
        { name: "visits", role: "measure", unit: "count", label: "Visits" },
    ],
    rows: Array.from({ length: 30 }, (_, i) => ({ day: isoDay(i), visits: Math.round(1200 + 260 * Math.sin(i / 3) + i * 14) }))
        .filter((r) => r.day !== "2026-10-12" && r.day !== "2026-10-13"),
};

/** Quarterly revenue over three years. */
export const quarterlyRevenue: Dataset = {
    title: "Revenue keeps a fourth-quarter peak",
    summary: "Quarterly revenue from 2024 to 2026, highest in the fourth quarter each year.",
    columns: [
        { name: "quarter", role: "time", grain: "quarter" },
        { name: "revenue", role: "measure", unit: "currency:USD", label: "Revenue" },
    ],
    rows: [118, 126, 131, 164, 139, 148, 152, 190, 161, 170, 176, 0].slice(0, 11).map((k, i) => ({
        quarter: `${2024 + Math.floor(i / 4)}-${String((i % 4) * 3 + 1).padStart(2, "0")}-01`, revenue: k * 1000,
    })),
};

/** Yearly totals, the share of each of two channels in each year. */
export const yearlyByChannel: Dataset = {
    title: "Online passed retail in 2024",
    summary: "Yearly sales for online and retail channels from 2020 to 2026.",
    columns: [
        { name: "year", role: "time", grain: "year" },
        { name: "channel", role: "category", label: "Channel", colors: { Online: "#4e79a7", Retail: "#f28e2c" } },
        { name: "sales", role: "measure", unit: "currency:USD", label: "Sales" },
    ],
    rows: [2020, 2021, 2022, 2023, 2024, 2025, 2026].flatMap((year, i) => [
        { year: String(year), channel: "Online", sales: 90000 + i * 38000 },
        { year: String(year), channel: "Retail", sales: 210000 - i * 9000 + (i % 2) * 8000 },
    ]),
};

/** Four months of spending by category: the same data as a donut for one month, or as a line over time. */
export const spendingOverTime: Dataset = {
    title: "Spending by category, July to October",
    summary: "Monthly spending in four categories from July to October 2026.",
    columns: [
        { name: "month", role: "time", grain: "month" },
        { name: "category", role: "category", label: "Category" },
        { name: "spent", role: "measure", unit: "currency:USD", label: "Spent" },
    ],
    rows: ["2026-07", "2026-08", "2026-09", "2026-10"].flatMap((month, i) => [
        { month, category: "Rent", spent: 1850 },
        { month, category: "Groceries", spent: 540 + i * 24 },
        { month, category: "Transport", spent: 210 + (i % 2) * 40 },
        { month, category: "Dining", spent: 120 + i * 18 },
    ]),
};

/** A year of sales in five regions whose order changes as the months go by: worth playing through. */
export const regionalSales: Dataset = {
    title: "The South overtakes the North in July",
    summary: "Monthly sales in five regions from January to December 2026. The North leads at first, the South leads from July.",
    columns: [
        { name: "month", role: "time", grain: "month" },
        { name: "region", role: "category", label: "Region" },
        { name: "sales", role: "measure", unit: "currency:USD", label: "Sales" },
    ],
    rows: Array.from({ length: 12 }, (_, m) => [
        { month: `2026-${String(m + 1).padStart(2, "0")}`, region: "North", sales: 82000 + m * 1500 + (m % 3) * 2500 },
        { month: `2026-${String(m + 1).padStart(2, "0")}`, region: "South", sales: 48000 + m * 6800 },
        { month: `2026-${String(m + 1).padStart(2, "0")}`, region: "East", sales: 64000 + m * 2200 - (m % 4) * 3000 },
        { month: `2026-${String(m + 1).padStart(2, "0")}`, region: "West", sales: 39000 + m * 4100 + (m > 8 ? 9000 : 0) },
        { month: `2026-${String(m + 1).padStart(2, "0")}`, region: "Central", sales: 26000 + m * 1100 },
    ]).flat(),
};
