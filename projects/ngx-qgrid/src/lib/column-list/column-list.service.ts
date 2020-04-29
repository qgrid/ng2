import { Injectable } from '@angular/core';
import { isUndefined } from '@qgrid/core/utility/kit';
import { parseFactory } from '@qgrid/core/services/convert';
import { ColumnListHost } from '@qgrid/core/column-list/column.list.host';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { GridRoot } from '../grid/grid-root';

@Injectable()
export class ColumnListService {
	private host: ColumnListHost;

	constructor(private root: GridRoot) {
	}

	add(column: ColumnModel) {
		this.view.add(column);
	}

	copy(target, source) {
		this.view.copy(target, source);
	}

	generateKey(source) {
		return this.view.generateKey(source);
	}

	extract(key, type): ColumnModel {
		return this.view.extract(key, type);
	}

	register(column: ColumnModel) {
		this.view.register(column);
	}

	delete(key: string) {
		this.view.delete(key);
	}

	get view() {
		if (this.host) {
			return this.host;
		}

		const canCopy = (key: string, source, target) =>
			target.hasOwnProperty(key) && !isUndefined(source[key]);

		this.host = new ColumnListHost(this.root.model, canCopy, parseFactory);

		return this.host;
	}
}
