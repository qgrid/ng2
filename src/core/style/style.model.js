import {noop} from '../services/utility';

export class StyleModel {
	constructor() {
		this.row = noop;
		this.cell = noop;
	}
}