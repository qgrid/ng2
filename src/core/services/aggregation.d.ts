export interface AggregationOptions {
	distinct: boolean;
	separator: string;
}

export declare class Aggregation {
	constructor();
	static first(rows: any[], getValue: (row: any) => any): any;
	static last(rows: any[], getValue: (row: any) => any): any;
	static max(rows: any[], getValue: (row: any) => any): any;
	static min(rows: any[], getValue: (row: any) => any): any;
	static minMax(rows: any[], getValue: (row: any) => any): [any, any];
	static avg(rows: any[], getValue: (row: any) => any, options: AggregationOptions): any;
	static sum(rows: any[], getValue: (row: any) => any, options: AggregationOptions): any;
	static join(rows: any[], getValue: (row: any) => any, options: AggregationOptions): any;
	static count(rows: any[], getValue: (row: any) => any, options: AggregationOptions): any;
}
