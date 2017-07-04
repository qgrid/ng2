export interface IState {
	expand: boolean
}

export declare class Node {
	constructor(public key: string, public level: number, public type: string);

	rows: any[];
	children: any[];
	state: IState;
}