import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { ScrollService } from 'ng2-qgrid/core/scroll/scroll.service';

export declare class BodyCtrl {
	constructor(model: Model, view: any, table: Table, bag: any);

	onScroll(e: any);
	onWheel(e: any);
	onMouseDown(e: MouseEvent);
	onMouseMove(e: MouseEvent);
	onMouseLeave(e: MouseEvent);
	onMouseUp(e: MouseEvent);
	resize(): void;
}
