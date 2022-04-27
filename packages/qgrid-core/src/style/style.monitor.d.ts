import { Model } from '../model/model';

export declare class StyleEntry {
	element: HTMLElement;
	sheets: Map<any, any>;
	list: Set<any>;

	constructor(element: HTMLElement, sheets: Map<any, any>);

	class(key: string, style: string): void;
}

export declare class StyleMonitor {
	entries: StyleEntry[];
	newSheets: Map<any, any>;
	oldSheets: Map<any, any>;

	constructor(model: Model);

	enter(): (key: string, style: string) => void;
	exit(): void;
}
