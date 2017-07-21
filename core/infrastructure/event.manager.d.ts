import {IFunc} from '../dom/view';

export interface IBindResult{
	(...args: any[]): any;
}

export declare class EventManager {
	constructor(context: object, apply: IFunc);
	context: object;
	apply: IFunc;
	bind(f: IFunc): IBindResult;
}
