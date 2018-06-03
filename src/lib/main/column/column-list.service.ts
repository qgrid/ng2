import { Injectable } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { compile } from 'ng2-qgrid/core/services/path';
import { isUndefined, clone, isObject, identity } from 'ng2-qgrid/core/utility/kit';
import { parseFactory } from 'ng2-qgrid/core/services/convert';
import { ColumnListCtrl } from 'ng2-qgrid/core/column-list/column.list.ctrl';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

@Injectable()
export class ColumnListService {
	columnListCtrl: ColumnListCtrl;

	constructor(private root: RootService) {
	}

	add(column) {
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

	register(column) {
		this.ctrl.register(column);
	}

	get ctrl() {
		if (this.columnListCtrl) {
			return this.columnListCtrl;
		}

		const canCopy = (key: string, source, target) =>
			target.hasOwnProperty(key) && !isUndefined(source[key]);

		this.columnListCtrl = new ColumnListCtrl(this.root.model, canCopy, parseFactory);

		return this.columnListCtrl;
	}
}
