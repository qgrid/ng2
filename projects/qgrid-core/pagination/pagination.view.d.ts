import { Model } from '../infrastructure/model';


export declare class PaginationView {
	constructor(model: Model);

	readonly current: number;
	readonly size: number;
}
