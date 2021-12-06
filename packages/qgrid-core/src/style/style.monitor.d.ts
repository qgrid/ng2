import { Model } from '../model/model';

export declare class StyleEntry {
	constructor(element: HTMLElement, sheets: Map<any, any>);
	element: HTMLElement;
	sheets: Map<any, any>;
	list: Set<any>;
	class(key: string, style: string): void;
}

export declare class StyleMonitor {
	constructor(model: Model);

	entries: StyleEntry[];
	newSheets: Map<any, any>;
	oldSheets: Map<any, any>;

	enter(): (key: string, style: string) => void;
	exit(): void;
}
