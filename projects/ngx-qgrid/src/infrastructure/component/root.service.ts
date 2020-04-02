import { Injectable, OnDestroy } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { CommandManager } from 'ng2-qgrid/core/command/command.manager';
import { Table } from 'ng2-qgrid/core/dom/table';
import { Bag } from 'ng2-qgrid/core/dom/bag';
import { ModelProxy } from 'ng2-qgrid/core/infrastructure/model.proxy';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Disposable } from '../disposable';

@Injectable()
export class RootService implements OnDestroy {
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

	set model(value: Model) {
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
