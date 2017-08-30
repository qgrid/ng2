import {noop} from '../utility';

export class StyleModel {
	constructor() {
		this.row = noop;
		this.cell = noop;
	}
}