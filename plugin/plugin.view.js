import {DisposableView} from '../core/view';

export class PluginView extends DisposableView {
	constructor(model) {
		super();

		this.model = model;
	}
}