import {noop} from '../services/utility';

export default class StyleModel {
	constructor() {
		this.row = noop;
		this.cell = noop;
	}
}