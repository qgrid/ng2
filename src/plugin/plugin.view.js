import { DisposableView } from '../core/view/disposable.view';

export class PluginView extends DisposableView {
	constructor(model) {
		super();

		this.model = model;
	}
}