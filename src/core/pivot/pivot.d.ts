export interface PivotSettings {
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

export declare function factory(plan: Plan): (settings: PivotSettings, plan: Plan) => object;
export declare function pivot(settings: PivotSettings, plan: Plan): object;
