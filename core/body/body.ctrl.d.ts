import { View } from '../view/view';
import { Model } from '../infrastructure/model';

export declare class BodyCtrl extends View {
	constructor(model: Model, view: any, bag: any);

	onScroll(e: any);
	onWheel(e: any);
	onClick(e: MouseEvent);
	onMouseDown(e: MouseEvent);
	onMouseMove(e: MouseEvent);
	onMouseLeave(e: MouseEvent);
	onMouseUp(e: MouseEvent);
}