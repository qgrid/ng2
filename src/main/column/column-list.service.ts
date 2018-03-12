import { Injectable } from '@angular/core';
import { compile } from 'ng2-qgrid/core/services';
import { isUndefined, clone, isObject, identity } from 'ng2-qgrid/core/utility';
import { parseFactory } from 'ng2-qgrid/core/services';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { ColumnListCtrl } from 'ng2-qgrid/core/column-list/column.list.ctrl';
import { Singleton } from 'ng2-qgrid/infrastructure/design/singleton';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

@Injectable()
export class ColumnListService {
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

	@Singleton()
	get ctrl() {
		const canCopy = (key: string, source, target) =>
			target.hasOwnProperty(key) && !isUndefined(source[key]);

		return new ColumnListCtrl(this.root.model, canCopy, parseFactory);
	}
}
