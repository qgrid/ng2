export interface IState {
	expand: boolean
}

export declare class Node {
	constructor(key: string, level: number, type: string);
	key: string;
	level: number;
	type: string;
	rows: any[];
	children: any[];
	state: IState;
}