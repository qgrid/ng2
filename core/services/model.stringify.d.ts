export interface IModelStringify {
	(model: object): string;
}

export declare function stringifyFactory(property: string): IModelStringify;
