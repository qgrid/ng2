import { GRID_PREFIX } from '../definition';

export class DragService {
	constructor() {
	}

	static get mimeType() {
		return `application/x-${GRID_PREFIX}+json`;
	}

	static decode(source) {
		return JSON.parse(source);
	}

	static encode(source) {
		return JSON.stringify(source);
	}
}

DragService.element = null;
DragService.data = null;
DragService.area = null;
DragService.startPosition = null;
