export interface ISettings {
	factory: () => object;
	selector: (param: any) => any;
	name: string;
	value: any;
}

export interface IPivotResult {
	(settings: ISettings , plan: Plan): object;
}

export declare class Plan {
	constructor(schema: object);
	isRoot: boolean;
	current: any;
	branch(): Plan;
	cursor(name: string): void;
	compile(data: object): object;
}

export declare function factory(plan: Plan): IPivotResult;
export declare function pivot(settings: ISettings , plan: Plan): object;