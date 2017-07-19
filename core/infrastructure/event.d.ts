import {IFunc} from '../dom/view';

export interface IEventShape{
	(): void;
}

export interface IReturn{
	(): void;
}

export declare class Event {
	constructor(e: IEventShape);
	on(f: IFunc): IReturn;
	watch(f: IFunc): void;
	emit(e: IEventShape): void;
}
