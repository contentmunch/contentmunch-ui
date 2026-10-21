export interface StackedBarChartData {
    titleField: string;
    totalField:string;
    stackFields: string[];
    values: FieldValue[];
    titleSeparator?:string;
}

export interface FieldValue {
    [id: string]: number | string;
}