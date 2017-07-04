import {Model} from "../infrastructure/model";

export interface IClassResult{
	(key: string, style: string): void;
}

export declare class Entry {
	constructor(public element: HTMLElement, public sheets: Map);

	list: Set;

	class(key: string, style: string): void;
}

export declare class Monitor {
	constructor(model: Model);

	entries: Entry[];
	newSheets: Map;
	oldSheets: Map;

	enter(): IClassResult;

	exit(): void;
}