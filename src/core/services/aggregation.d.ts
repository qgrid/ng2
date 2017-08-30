export interface IAggregationOptions{
	distinct: boolean;
	separator: string;
}

export interface IGetValue{
	(row: any): string;
}

export declare class Aggregation {
	constructor();
	static first(rows: any[], getValue: IGetValue): IGetValue;
	static last(rows: any[], getValue: IGetValue): IGetValue;
	static max(rows: any[], getValue: IGetValue): IGetValue;
	static min(rows: any[], getValue: IGetValue): IGetValue;
	static minMax(rows: any[], getValue: IGetValue): IGetValue;
	static avg(rows: any[], getValue: IGetValue, options: IAggregationOptions[]): IGetValue;
	static sum(rows: any[], getValue: IGetValue, options: IAggregationOptions[], container: any): IGetValue; // CONTAINER TYPE?
	static join(rows: any[], getValue: IGetValue, options: IAggregationOptions[]): IGetValue;
	static count(rows: any[], getValue: IGetValue, options: IAggregationOptions[]): IGetValue;

}