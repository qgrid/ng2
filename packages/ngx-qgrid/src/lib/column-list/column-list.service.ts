import { Injectable } from '@angular/core';
import { isUndefined } from '@qgrid/core/utility/kit';
import { parseFactory } from '@qgrid/core/services/convert';
import { ColumnListHost } from '@qgrid/core/column-list/column.list.host';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { GridPlugin } from '../plugin/grid-plugin';
import { Lazy } from '@qgrid/core/infrastructure/lazy';

@Injectable()
export class ColumnListService {
	private host = new Lazy(() => {
		const canCopy = (key: string, source, target) =>
			target.hasOwnProperty(key) && !isUndefined(source[key]);

		return new ColumnListHost(this.plugin.model, canCopy, parseFactory);
	});

	constructor(private plugin: GridPlugin) {
	}

	add(column: ColumnModel) {
		this.host.instance.add(column);
	}

	copy(target, source) {
		this.host.instance.copy(target, source);
	}

	generateKey(source) {
		return this.host.instance.generateKey(source);
	}

	extract(key, type): ColumnModel {
		return this.host.instance.extract(key, type);
	}

	register(column: ColumnModel) {
		this.host.instance.register(column);
	}

	delete(key: string) {
		this.host.instance.delete(key);
	}
}
