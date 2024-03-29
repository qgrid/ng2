export interface PivotSettings {
	factory: () => any;
	selector: (param: any) => any;
	name: string;
	value: any;
}

export declare class Plan {
  isRoot: boolean;
  current: any;

  constructor(schema: {[key: string]: any});

  branch(): Plan;
  cursor(name: string): void;
  compile(data: any): any;
}

export declare function factory(plan: Plan): (settings: PivotSettings, plan: Plan) => any;
export declare function pivot(settings: PivotSettings, plan: Plan): any;
