import { Model } from '../infrastructure/model';

export declare class ScrollService {
	constructor(model: Model, markup: any);
	interval: number;
	canScroll(e: MouseEvent): void;
}
