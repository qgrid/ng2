import {IFunc} from '../dom/view';

export interface IBindResult {
	(...args: any[]): any;
}

export declare class EventManager {
	constructor(context: any, apply?: Function);

	bind(f: IFunc): IBindResult;
}
