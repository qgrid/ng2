import {IFunc} from '../dom/view';

export interface IEventShape{
	(): void;
}

export interface IReturn{
	(): void;
}

export declare class Event {
	constructor();
	on(f: IFunc): IReturn;
	watch(f: IFunc): void;
	emit(e: string): void;
}
