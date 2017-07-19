import {Model} from '../infrastructure/model';

export interface IClassResult{
	(key: string, style: string): void;
}

export declare class Entry {
	constructor(element: HTMLElement, sheets: Map<any, any>);
	element: HTMLElement;
	sheets: Map<any, any>;
	list: Set<any>;
	class(key: string, style: string): void;
}

export declare class Monitor {
	constructor(model: Model);
	entries: Entry[];
	newSheets: Map<any, any>;
	oldSheets: Map<any, any>;
	enter(): IClassResult;
	exit(): void;
}
