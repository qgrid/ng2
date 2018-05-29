import { Injectable, OnDestroy } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { CommandManager } from 'ng2-qgrid/core/command/command.manager';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';
import { isUndefined } from 'ng2-qgrid/core/utility/kit';
import { Bag } from 'ng2-qgrid/core/dom/bag';
import { ModelProxy } from 'ng2-qgrid/core/infrastructure/model.proxy';

@Injectable()
export class RootService implements OnDestroy {
	private modelProxy: ModelProxy = null;
	public markup: any = {};
	public bag = {
		head: new Bag(),
		body: new Bag(),
		foot: new Bag()
	};

	public table: Table = null;
	public commandManager: CommandManager = null;

	constructor() { }

	get model() {
		Guard.notNull(this.modelProxy, 'model');

		return this.modelProxy.subject;
	}

	set model(value: Model) {
		if (this.modelProxy) {
			if (this.modelProxy.target !== value) {
				this.modelProxy.dispose();
				this.modelProxy = new ModelProxy(value);
				return;
			}
		}

		if (value) {
			this.modelProxy = new ModelProxy(value);
		}
	}

	ngOnDestroy() {
		if (this.modelProxy) {
			this.modelProxy.dispose();
			this.modelProxy = null;
		}
	}
}
