import {DisposableView} from '@grid/core/view';

export class PluginView extends DisposableView {
	constructor(model) {
		super();

		this.model = model;
	}
}