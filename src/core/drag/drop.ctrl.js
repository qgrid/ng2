import { GRID_PREFIX } from '../definition';
import { Disposable } from '../infrastructure/disposable';

export class DropCtrl extends Disposable {
	constructor(model, context) {
		supser();

		this.model = model;
		this.context = context;
		
		context.element.classList.add(`${GRID_PREFIX}-can-drop`);
	}

	drop(e) {
		e.stopPropagation();

		const context = this.context;
		context.element.classList.remove(`${GRID_PREFIX}-dragover`);
		const event = context.event(e.dataTransfer);
		if (context.canDrop(event)) {
			context.drop(event);
		}

		return false;
	}

	enter(e) {
		e.preventDefault();

		const context = this.context;
		context.element.classList.add(`${GRID_PREFIX}-dragover`);
		e.dataTransfer.dropEffect = context.effect || 'move';
		return false;
	}

	over(e) {
		e.preventDefault();

		const context = this.context;
		let effect = context.effect || 'move';
		if (context.element.classList.contains(`${GRID_PREFIX}-drag`) ||
			context.canDrop(context.event()) === false) {
			effect = 'none';
		}

		e.dataTransfer.dropEffect = effect;
		return false;
	}

	leave() {
		this.context.element.classList.remove(`${GRID_PREFIX}-dragover`);
	}

	dispose() {
		super();
		
		this.context.element.classList.remove(`${GRID_PREFIX}-can-drop`);
	}
}