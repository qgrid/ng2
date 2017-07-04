import {IFunc} from "../dom/view";

export interface IOnResult{
	(): void;
}

export declare class EventListener {

	constructor(context: object, element: HTMLElement);

	on(name: string, f: IFunc): IOnResult;

	off(): void;
}