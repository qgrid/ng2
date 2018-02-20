export interface IPivotSettings {
	factory: () => object;
	selector: (param: any) => any;
	name: string;
	value: any;
}

export declare interface IPlan {
	constructor(schema: object);
	isRoot: boolean;
	current: any;
	branch(): IPlan;
	cursor(name: string): void;
	compile(data: object): object;
}

export declare function factory(plan: IPlan): (settings: IPivotSettings, plan: IPlan) => object;
export declare function pivot(settings: IPivotSettings, plan: IPlan): object;
