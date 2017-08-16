import {IFunc} from '../dom/view';

export interface IReturn {
	(): void;
}

export declare class Event {
	constructor(e?: () => any);

	on(handler: IFunc): IReturn;

	watch(handler: (e: any, off?: () => void) => void): () => void;

	emit(e: any): void;
}
