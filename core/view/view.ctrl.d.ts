import { View } from '../view/view';
import { GridService } from '../services/grid';

export declare class ViewCtrl extends View {
	constructor(view: any, gridService: GridService) {
	}

	invalidate(): void;
}