import { DragService } from './drag.service';
import { GRID_PREFIX } from '../definition';
import { Disposable } from '../infrastructure/disposable';

export class DragCtrl extends Disposable {
	constructor(model, context) {
		super();

		this.model = model;
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
			this.model.drag({ isActive: true }, { source: 'drag.ctrl' });
		}
	}

	end() {
		this.context.element.classList.remove(`${GRID_PREFIX}-drag`);
		DragService.transfer = null;

		if (this.model) {
			this.model.drag({ isActive: false }, { source: 'drag.ctrl' });
		}
	}

	dispose() {
		super();

		this.context.element.classList.remove(`${GRID_PREFIX}-can-drag`);
	}
}
