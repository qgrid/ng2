import { GRID_PREFIX } from '../definition';

let data = null;
let area = null;
let element = null;

export class DragService {
	constructor() {
	}

	static get mimeType() {
		return `application/x-${GRID_PREFIX}+json`;
	}

	static get element() {
		return element;
	}

	static set element(value) {
		return element = value;
	}

	static get data() {
		return data;
	}

	static set data(value) {
		data = value;
	}

	static get area() {
		return area;
	}

	static set area(value) {
		area = value;
	}

	static decode(source) {
		return JSON.parse(source);
	}

	static encode(source) {
		return JSON.stringify(source);
	}
}