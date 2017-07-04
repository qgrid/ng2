import {INoopResult} from "../utility/utility";

export interface IBindResult{
	(): void;
}

export declare class ModelBinder {
	constructor(public source: object);

	off: INoopResult;

	bind(model: object, names: string[], run: boolean): IBindResult;
}