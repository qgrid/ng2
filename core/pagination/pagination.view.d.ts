import { View } from '../view/view';
import { Model } from '../infrastructure/model';

/**
 * > Under Construction.
 */
export declare class PaginationView extends View {
	constructor(model: Model);

	readonly current: number;
	readonly size: number;
}
