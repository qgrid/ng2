import {DisposableView} from './disposable.view';

export class View extends DisposableView {
	constructor(model) {
		super();

		this.model = model;
	}
}