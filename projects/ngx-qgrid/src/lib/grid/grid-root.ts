import { Injectable, OnDestroy } from '@angular/core';
import { Guard } from '@qgrid/core/infrastructure/guard';
import { CommandManager } from '@qgrid/core/command/command.manager';
import { ModelProxy } from '@qgrid/core/infrastructure/model.proxy';
import { DomTable, DomBag } from '../dom/dom';
import { GridModel } from '../grid/grid-model';
import { Disposable } from '../infrastructure/disposable';

@Injectable()
export class GridRoot implements OnDestroy {
	private modelProxy: ModelProxy = null;
	private disposable = new Disposable();

	markup: { [key: string]: HTMLElement } = {};
	bag = {
		head: new DomBag(),
		body: new DomBag(),
		foot: new DomBag()
	};

	table: DomTable = null;
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
