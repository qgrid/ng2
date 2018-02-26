import { View } from '../view/view';
import { Model } from '../infrastructure/model';

export declare class HeadCtrl extends View {
	constructor(model: Model, view: any, bag: any);

	onMouseMove(e: MouseEvent);
	onMouseLeave(e: MouseEvent);
}
