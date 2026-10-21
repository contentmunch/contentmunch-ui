# Visualization data and props: design

One typed dataset describes the numbers. Every visualization is a different drawing of it. The dataset carries meaning (units, colors, what each column is); the visualization carries almost nothing.

Status: proposal, nothing built. Replaces `PieChart`, `DonutChart` and `StackedBarChart` as they are today.

## 1. Principles

1. **The dataset says what the numbers are. The chart decides how to draw them.** Units, colors, titles and descriptions are data. Chart props are only about the screen.
2. **The only required prop is `data`.** Everything else has an opinionated default.
3. **No functions in data or props.** No `valueFormatter`, no per-datum callbacks. Everything declarative, so a dataset can be stored, validated and sent over an API.
4. **Selection and period belong to the app.** Charts are controlled and keep no state of their own.
5. **Derived values are derived.** Totals, shares and "Other" are computed from the rows, never stored beside them.
6. **A new need becomes a dataset field, not a chart prop**, and only when a real consumer needs it.

## 2. The dataset

```ts
interface Dataset {
  title: string;      // states the point: "Online overtook retail in March"
  summary: string;    // required plain-text description; read by screen readers, indexed for search
  columns: Column[];
  rows: Row[];        // plain objects keyed by column name
}

type Row = Record<string, string | number | null>;

type Column = CategoryColumn | MeasureColumn | TimeColumn;

interface CategoryColumn {
  name: string;
  role: "category";            // what you slice by: property, status, region
  label?: string;              // display name, defaults to name
  colors?: Record<string, Color>;   // pin a value to a color (see section 5)
}

interface MeasureColumn {
  name: string;
  role: "measure";             // a number to draw
  unit: Unit;                  // required: there is no unit-less number
  label?: string;
}

interface TimeColumn {
  name: string;
  role: "time";                // ISO date; its grain says how to print and step it
  grain: "day" | "month" | "quarter" | "year";
}

type Unit = "count" | "number" | "percent" | "share" | `currency:${string}`;
```

Rules the validator enforces (the backend later enforces the same ones):

- At least one measure; every measure value is finite or null; no negatives for kinds that forbid them.
- At most one time column; at most two category columns.
- The values of the first category (plus the time value, if present) are unique per row.
- A row cap (500 for now), and a length cap on text.
- `summary` and `title` are not empty.
- Every `unit` is known. A `currency:` unit carries an ISO code.

### Roles decide structure

| Columns present | Meaning |
| --- | --- |
| 1 category, 1 measure | One value per category. A pie, donut, bar or table. |
| 1 category, several measures | The measures are parts of each category. Drawn **stacked**, one segment per measure. |
| 2 categories, 1 measure | The second category splits the first into series. Drawn **grouped**. |
| time, 1 measure | One value over time. A line, or a KPI with a trend. |
| time, 1 category, 1 measure | One line per category. |

This is the whole grammar. A kind declares which of these shapes it accepts; the registry (section 7) tells the editor which kinds fit a dataset.

### Units

| Unit | Stored as | Printed as |
| --- | --- | --- |
| `count` | whole number | `1,240` (compact `1.2k` when space is short) |
| `number` | any number | `3.14`, decimals chosen from the data's magnitude |
| `percent` | a fraction: `0.42` | `42%` |
| `currency:USD` | a number | `$1,240.50`, using the user's locale |
| `share` | a raw number | the value as a percent of the whole it belongs to |

`share` is how the old `toPercentage` survives without a prop. The whole is the **stack** for bars (each bar is scaled to 100%) and the **column total** for pie and donut. Pie and donut always show the share beside the value, so for them `share` changes nothing.

## 3. Props

```ts
interface VisualizationProps {
  data: Dataset;                         // required
  size?: "small" | "medium" | "large";   // default "medium"
  selected?: string | null;              // a category value, controlled
  onSelect?: (key: string | null) => void;
  period?: string | null;                // ISO date, controlled; default is the latest
  legend?: boolean;                      // default true
}
```

That is the whole contract, the same for every kind. Bars ignore `selected` and `onSelect`.

What disappears from today's props, and where it went:

| Today | Now |
| --- | --- |
| `valueFormatter` | `unit` on the measure |
| `toPercentage` | `unit: "share"` on the measure |
| `colorRange`, per-datum `color` | `colors` on the category column, or the theme palette |
| `legendTitle`, `withLegend` | The legend is automatic; its title is the series column's `label` |
| per-slice `legend` text | The category value is the label |
| `isSelected` on data | `selected` prop |
| `onClick(index)` | `onSelect(key)` |
| donut `size` in pixels | `size` preset |
| `showOnlyValues` | Values are labelled directly by default |
| `comparisonData`, `titleSeparator` | A second category column (section 4) |
| donut `centerLabel`, `centerValue` | Derived: the total, or the selected category's value (section 6) |
| `selected` by title on donut, index on pie | One mechanism, by category value |

## 4. The comparison report

The Renaissance admin comparison report draws two sets of leases side by side. Today it merges two datasets and splits the label on `":"`. As one dataset:

```json
{
  "title": "Leases signed by property, this year and last",
  "summary": "Number of leases signed per property, split by new, renewal, extension and vacant, for two date ranges.",
  "columns": [
    { "name": "property", "role": "category", "label": "Property" },
    { "name": "range", "role": "category", "label": "Period" },
    { "name": "New", "role": "measure", "unit": "count" },
    { "name": "Renewal", "role": "measure", "unit": "count" },
    { "name": "Extension", "role": "measure", "unit": "count" },
    { "name": "Vacant", "role": "measure", "unit": "count" }
  ],
  "rows": [
    { "property": "Harbour", "range": "Jan 1 to Mar 31", "New": 4, "Renewal": 9, "Extension": 2, "Vacant": 1 },
    { "property": "Harbour", "range": "Jan 1 to Mar 31 (last year)", "New": 6, "Renewal": 7, "Extension": 1, "Vacant": 2 }
  ]
}
```

Two categories and several measures: bars are grouped by property, one bar per range, and each bar is stacked by lease type. Nothing parses a label. The app builds the dataset; the chart reads the columns.

The Occupancy bar chart is one category (`property`) and several measures with `unit: "share"` on each, so every bar scales to 100%. The pies are one category and one measure.

## 5. Color

- **Tokens, never hex.** A color is one of `1` to `8` (the series palette), or `good`, `bad`, `warn`, `info`, `neutral`. They map to CSS custom properties, so dark mode works with no change in the data.
- **Pinned by value:** `colors: { "Occupied": "good", "Vacant": "bad" }` always draws those two the same way, in any kind, in any period.
- **Unpinned values** take the series palette in alphabetical order of the values seen in the dataset. A category keeps its color when rows reorder; adding a new value can move later ones, which is why important categories should be pinned.
- **Measures as series** (stacked) are colored by measure name by the same rule.
- **Selection:** the selected category keeps its color and everything else drops to 40% opacity. No second highlight color.
- Eight palette colors is a hard ceiling. Past six categories, pie and donut group the rest into "Other" (section 6).

## 6. What each kind does with the data

| Kind | Accepts | Defaults |
| --- | --- | --- |
| **Bar** | 1 category with 1 or more measures (stacked), or 2 categories with 1 measure (grouped) | Starts at zero. Values labelled on the bars. No gridlines. Sorted as the rows are given. Horizontal when labels are long. |
| **Pie** | 1 category, 1 measure, no negatives | Largest first. Slices over six, or under 3% together, become "Other". Each slice labelled with its category and share; a legend only when labels do not fit. |
| **Donut** | Same as pie | Same as pie. The centre shows the total with the measure's label, or the selected category and its value. With a time column, it also shows the period. |
| **Line** | A time column and 1 or more measures, or time with 1 category | Ordered by time. Up to six series; more are refused by the validator. Last value labelled at the line's end. |
| **KPI** | A time column and 1 measure | The latest value large, the change from the previous period beside it, and a small line of the history. |
| **Table** | Any columns | Columns in the dataset's order. Numbers right-aligned in tabular figures, printed by unit. The same hidden table every other kind renders for accessibility. |

- **Period:** pie, donut, KPI and table show one period at a time (the `period` prop, default latest). Bar and line draw all of them. A category missing from a period draws as zero.
- **Stable encodings across periods:** colors follow the category, pie and donut keep slice order, bars share one value-axis maximum.
- **Every kind** renders a visually hidden data table, so the figures are readable and searchable.
- **Empty and error states are built in** and use one wording per state.
- **Negatives:** pie and donut refuse them; the others draw them below the zero line.

## 7. Registry and adapters

```ts
interface KindDefinition {
  kind: "bar" | "pie" | "donut" | "line" | "kpi" | "table";
  label: string;
  fits(data: Dataset): boolean;           // can this kind draw this dataset
  adapt(data: Dataset, period?: string | null): Model;   // pure, tested
  component: React.FC<{ model: Model; size: Size; selected?: string | null; onSelect?: (k: string | null) => void }>;
}
```

- `adapt` is where the choices live: pie picks its one measure, groups "Other", sorts; bar decides stacked or grouped; KPI finds the latest and previous periods. Each is a plain function with its own tests.
- `fitting(data)` returns the kinds that can draw a dataset, in order of preference. The entity editor offers exactly those, and "change the type" is a dropdown over that list.
- The exported components `PieChart`, `DonutChart`, `BarChart`, `LineChart`, `KpiChart` and `TableChart` are thin: `adapt`, then draw. A generic `<Visualization kind data/>` looks up the registry; the notes app will use that one.

## 8. Look and size

**The drawings are the ones the charts have always had.** Pie, donut and bar are drawn by their original code, in `src/visualization/plots/`, with their original stylesheets: same palette, fonts, labels, legends, selection and spacing. The new layer only changes what feeds them. One fix: the pie gave its first colors to the first and last titles alphabetically; it now gives them in the order the parts come.

Every chart sits in a figure that adds only what is invisible: the title and summary for assistive technology, the numbers as a hidden table, and a message when the data cannot be drawn or is empty.

### One size rule

`size` is `small`, `medium` (default) or `large`, and one factor scales every kind from its medium size, the size the charts have always been:

| Size | Factor | Pie and donut (diameter) | Bars (widest) |
| --- | --- | --- | --- |
| small | 0.75 | 165 px | 540 px |
| medium | 1 | 220 px | 720 px |
| large | 1.15 | 253 px | 828 px |

Bars fill the width they are given, up to that.

### Color

- Tokens `1` to `8` are the palette the charts used, in their order (`#4e79a7`, `#59a14f`, `#f28e2c`, `#e15759`, `#261759`, `#acd643`, `#daf2dc`), plus an eighth (`#76b7b2`). `good`, `bad`, `warn`, `info` and `neutral` are meanings.
- A color may also be a `#rrggbb` the person chose (Balance's category colors).
- Unpinned values take the palette in the order they first appear in the data, as before.

## 9. Rendering

- A pure adapter turns the dataset into what each drawing takes: `radialModel` for pie and donut, `barPlotInput` for bars. They are tested on their own.
- The pie and donut take a legend by default. `legend={false}` leaves it out, for a page that already lists the same parts beside the chart (Balance).
- Bars take no selection; the drawing has never had one.
- A bar chart compares at most two groups (a second category, or two periods), as the drawing has always done. With more periods it shows one, chosen by `period`.
- Negative values are refused by all three, which the drawings were never built for.

## 9b. The kinds added after the first three

Line, KPI and table are new drawings, made to sit beside the old ones: the same font token, the palette in its order, black small labels, navy axes, the donut's legend and its uppercase label style.

- **Line:** a time column with one or more measures, or with one category and one measure (a line per value). Zero baseline, round ticks, last value labelled when there is one line, at most six lines, a missing value breaks the line.
- **KPI:** a time column and a measure: the latest (or `period`) value large, the change from the period before with the periods named, and a small history line.
- **Table:** the library's own `Table`, every row and column in the order given, each printed by its unit; numbers sort as numbers.
- **Registry:** `fitting(data)` lists the kinds that can draw a dataset, best first (what an editor's "type" list offers); `<Visualization kind data/>` draws any of them from the same props.
- **One font:** all kinds use `--viz-font` (the library's sans by default). The bar chart used to set its axis, labels and legend in the serif; they now follow the token.

## 9c. The time slider

`<TimeSlider data period onPeriod intervalMs?/>` steps through the periods that have data: play and pause, first and last, and the library's slider labelled with the periods. It only reports the period; the chart is given it as `period`, so one slider can drive a whole page.

- **Worth playing:** donut and pie (shares trade places), bars (comparison across regions or products), KPI (value, change and history up to the month), and a line (a cursor with each line's value).
- **Bars while playing:** every category keeps its place in every period (empty when it has no value) and the axis is fixed at the largest bar of any period, so a change in length is a change in value. Giving a bar chart a `period` shows that one period, even when the data has only two (which are otherwise compared).
- **Playback:** one period every 1.2 seconds by default, once, stopping at the last; play from the end starts again. Moving the slider or the first/last buttons pauses.
- **Not animated:** frames step, they do not tween; the original drawings redraw each period. Smooth transitions between periods would be a change to those drawings.

## 10. Migration

- **Balance** `ReportPage`: one donut. Its data becomes one category (`name`), one measure (`currency:USD`) and a time column (`month`). `centerLabel` and `centerValue` go away: the centre shows the total and the month, or the selected category.
- **Renaissance admin:** five charts (two pies, two single bars, the comparison). Each call site builds a `Dataset` in `LeaseReportService` instead of the old data shapes. The status pie's click handler becomes `onSelect(key)`. Their pie tests move off the SVG legend text and read the accessible table.
- No compatibility layer. The library version is bumped once and both apps are migrated in the same change.

## 11. Decided here, open elsewhere

- Pie and donut never show a negative; the editor refuses to draw one and suggests a bar.
- Past six categories the rest become "Other", automatically and not configurable.
- Keep a small set of kinds. A chart a reader needs instructions for (heatmap, treemap, flow) stays out.
- Still to decide, for the notes integration and not this library: publishing behaviour for data edits, revision history, and whether to capture an SVG at save time. Recommendations are in the conversation.
