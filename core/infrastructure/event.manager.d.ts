import {IFunc} from '../dom/view';

export interface IBindResult{
	(...args: any[]): any;
}

export declare class EventManager {
	constructor(context: object);
	context: object;
	bind(f: IFunc): IBindResult;
}
