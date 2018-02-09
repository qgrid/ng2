import { Injectable, ViewContainerRef } from '@angular/core';
import { Layer } from './layer';

@Injectable()
export class LayerService {
	public viewContainerRef: ViewContainerRef;

	constructor() {
	}

	create(name) {
		// const node = markup.document.createElement(`div`);
		// node.classList.add(name);
		// node.classList.add(`${GRID_PREFIX}-layer`)
		// markup.view.appendChild(node);
		//
		// const ctrl = angular.element(markup.view).controller(VIEW_CORE_NAME);
		// if (!ctrl) {
		//   throw new AppError('box', 'Controller for box is not found')
		// }
		//
		// if (!ctrl.$scope) {
		//   throw new AppError('box', 'Controller scope for box is not found')
		// }

		return new Layer();
	}
}
