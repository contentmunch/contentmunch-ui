export interface DonutChartData {
    title: string;
    value: number;
    /**
     * optional -- omitted colors are assigned from `colorRange` (or the
     * component's default palette) in data order, same as PieChart does
     * via its d3 ordinal scale.
     */
    color?: string;
    legend?: string;
    isSelected?: boolean;
}
