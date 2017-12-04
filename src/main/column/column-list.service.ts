import { Injectable } from '@angular/core';
import { compile } from 'ng2-qgrid/core/services';
import { isUndefined, clone, isObject, identity } from 'ng2-qgrid/core/utility';
import { parseFactory } from 'ng2-qgrid/core/services';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { ColumnListCtrl } from 'ng2-qgrid/core/column-list/column.list.ctrl';
import { Singleton } from 'ng2-qgrid/infrastructure/design';

@Injectable()
export class ColumnListService {
	constructor(private root: RootService) {
	}

	copy(target, source) {
		return this.ctrl.copy(target, source);
	}

	add(column) {
		this.ctrl.add(column);
	}

	register(column) {
		this.ctrl.register(column);
	}

	@Singleton()
	get ctrl() {
		const canCopy = (key: string, source) => !isUndefined(source[key]);
		return new ColumnListCtrl(this.root.model, canCopy, parseFactory);
	}
}
