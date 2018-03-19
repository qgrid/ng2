export interface IPivotSettings {
	factory: () => object;
	selector: (param: any) => any;
	name: string;
	value: any;
}

export declare class Plan {
	constructor(schema: object);

	isRoot: boolean;
	current: any;

	branch(): Plan;
	cursor(name: string): void;
	compile(data: object): object;
}

export declare function factory(plan: Plan): (settings: IPivotSettings, plan: Plan) => object;
export declare function pivot(settings: IPivotSettings, plan: Plan): object;
