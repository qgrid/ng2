import { DragService } from 'ng2-qgrid/core/drag/drag.service';
import { GRID_PREFIX } from '../definition';
import { View } from '../view/view';

export class DragCtrl extends View {
	constructor(model, context) {
		super(model);

		this.context = context;
		context.element.classList.add(`${GRID_PREFIX}-can-drag`);
	}

	start(e) {
		const transfer = e.dataTransfer;
		const context = this.context;
		const source = context.transfer();

		if (context.canDrag(context.event(source)) === false) {
			e.preventDefault();
			transfer.effectAllowed = 'none';
			return false;
		}

		const element = context.element;

		element.classList.add(`${GRID_PREFIX}-drag`);
		transfer.setData(DragService.mimeType, DragService.encode(source));
		transfer.effectAllowed = context.effect || 'move';
		transfer.setDragImage(element, 0, 0);
		DragService.transfer = source;

		if (this.model) {
			this.model.drag({ isActive: true });
		}
	}

	end() {
		this.context.element.classList.remove(`${GRID_PREFIX}-drag`);
		DragService.transfer = null;

		if (this.model) {
			this.model.drag({ isActive: false });
		}
	}

	dispose() {
		super.dispose();

		this.context.element.classList.remove(`${GRID_PREFIX}-can-drag`);
	}
}
