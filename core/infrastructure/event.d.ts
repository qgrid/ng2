import {IFunc} from '../dom/view';

export interface IReturn {
	(): void;
}

export declare class Event {
	constructor(e: () => any);

	on(f: IFunc): IReturn;

	watch(f: IFunc): void;

	emit(e: string): void;
}
