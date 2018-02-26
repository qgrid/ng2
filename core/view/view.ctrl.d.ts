import { View } from '../view/view';
import { GridService } from '../services/grid';
import { Model } from '../infrastructure/model';

export declare class ViewCtrl extends View {
	constructor(model: Model, view: any, service: GridService);

	invalidate(): void;
}
