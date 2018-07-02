import { GridService } from '../services/grid';
import { Model } from '../infrastructure/model';

export declare class ViewCtrl {
	constructor(model: Model, view: any, service: GridService);

	invalidate(): void;
}
