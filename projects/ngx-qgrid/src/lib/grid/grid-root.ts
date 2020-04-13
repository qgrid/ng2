import { Injectable, OnDestroy } from '@angular/core';
import { Guard } from 'qgrid-core/infrastructure/guard';
import { CommandManager } from 'qgrid-core/command/command.manager';
import { Table } from 'qgrid-core/dom/table';
import { Bag } from 'qgrid-core/dom/bag';
import { ModelProxy } from 'qgrid-core/infrastructure/model.proxy';
import { GridModel } from '../grid/grid-model';
import { Disposable } from '../infrastructure/disposable';

@Injectable()
export class GridRoot implements OnDestroy {
	private modelProxy: ModelProxy = null;
	private disposable = new Disposable();

	markup: { [key: string]: HTMLElement } = {};
	bag = {
		head: new Bag(),
		body: new Bag(),
		foot: new Bag()
	};

	table: Table = null;
	commandManager: CommandManager = null;

	get isReady() {
		return !!this.modelProxy;
	}

	get model() {
		Guard.notNull(this.modelProxy, 'model');

		return this.modelProxy.subject;
	}

	set model(value: GridModel) {
		if (this.modelProxy) {
			if (this.modelProxy.target !== value) {
				this.modelProxy = new ModelProxy(value, this.disposable);
				return;
			}
		}

		if (value) {
			this.modelProxy = new ModelProxy(value, this.disposable);
		}
	}

	ngOnDestroy() {
		this.disposable.finalize();
		this.modelProxy = null;
	}
}
