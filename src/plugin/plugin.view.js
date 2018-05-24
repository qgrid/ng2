import { Disposable } from '../core/infrastructure/disposable';

export class PluginView extends Disposable {
	constructor(model) {
		super();

		this.model = model;
	}
}