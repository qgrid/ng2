import { View } from '../view/view';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { ScrollService } from '../scroll/scroll.service';

export declare class BodyCtrl extends View {
	constructor(model: Model, view: any, table: Table, bag: any, scrollService: ScrollService);

	onScroll(e: any);
	onWheel(e: any);
	onMouseDown(e: MouseEvent);
	onMouseMove(e: MouseEvent);
	onMouseLeave(e: MouseEvent);
	onMouseUp(e: MouseEvent);
}
