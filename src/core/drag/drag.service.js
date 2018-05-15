import { GRID_PREFIX } from '../definition';

let transfer = null;

export class DragService {
	constructor() {
	}

	static get mimeType() {
		return `application/x-${GRID_PREFIX}+json`;
	}

	static get transfer() {
		return transfer;
	}

	static set transfer(value) {
		transfer = value;
	}

	static decode(source) {
		return JSON.parse(source);
	}

	static encode(source) {
		return JSON.stringify(source);
	}
}