import { Injectable } from '@angular/core';
import {
	ColumnListHost,
	ColumnModel,
	isUndefined,
	Lazy,
	parseFactory,
} from '@qgrid/core';
import { GridPlugin } from '../plugin/grid-plugin';

@Injectable()
export class ColumnListService {
	private host = new Lazy(() => {
		const canCopy = (key: string, source, target) =>
			Object.prototype.hasOwnProperty.call(target, key) && !isUndefined(source[key]);

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
