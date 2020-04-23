import { Injectable } from '@angular/core';
import { isUndefined } from '@qgrid/core/utility/kit';
import { parseFactory } from '@qgrid/core/services/convert';
import { ColumnListCtrl } from '@qgrid/core/column-list/column.list.ctrl';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { GridRoot } from '../grid/grid-root';

@Injectable()
export class ColumnListService {
	private _ctrl: ColumnListCtrl;

	constructor(private root: GridRoot) {
	}

	add(column: ColumnModel) {
		this.ctrl.add(column);
	}

	copy(target, source) {
		this.ctrl.copy(target, source);
	}

	generateKey(source) {
		return this.ctrl.generateKey(source);
	}

	extract(key, type): ColumnModel {
		return this.ctrl.extract(key, type);
	}

	register(column: ColumnModel) {
		this.ctrl.register(column);
	}

	delete(key: string) {
		this.ctrl.delete(key);
	}

	get ctrl() {
		if (this._ctrl) {
			return this._ctrl;
		}

		const canCopy = (key: string, source, target) =>
			target.hasOwnProperty(key) && !isUndefined(source[key]);

		this._ctrl = new ColumnListCtrl(this.root.model, canCopy, parseFactory);

		return this._ctrl;
	}
}
