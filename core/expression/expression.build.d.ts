export interface IRoot{
	kind: string;
	op: string;
	left: object;
	right: object;
}

export declare function build(filterBy: object, op: string): IRoot;