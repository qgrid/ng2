import { Injectable } from '@angular/core';
import { bodyCellClassifier, ColumnModel, headCellClassifier } from '@qgrid/core';

@Injectable()
export class CellClassService {
	private bodyCache = new Map<ColumnModel, (x: HTMLElement) => void>();

	toBody(element: HTMLElement, column: ColumnModel) {
		let classify = this.bodyCache.get(column);
		if (!classify) {
			classify = bodyCellClassifier(column);
			this.bodyCache.set(column, classify);
		}

		classify(element);
	}

	toHead(element: HTMLElement, column: ColumnModel) {
		const classify = headCellClassifier(column);
		classify(element);
	}
}
