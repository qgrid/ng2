import { Injectable, OnDestroy } from '@angular/core';
import { Guard } from '@qgrid/core/infrastructure/guard';
import { CommandManager } from '@qgrid/core/command/command.manager';
import { DomTable, DomBag } from '../dom/dom';
import { GridModel } from '../grid/grid-model';
import { Disposable } from '../infrastructure/disposable';

@Injectable()
export class GridRoot implements OnDestroy {
	private disposable = new Disposable();
	private gridModel: GridModel;

	table: DomTable;
	commandManager: CommandManager;

	markup: { [key: string]: HTMLElement } = {};
	bag = {
		head: new DomBag(),
		body: new DomBag(),
		foot: new DomBag()
	};


	get isReady() {
		return !!this.gridModel;
	}

	get model(): GridModel {
		Guard.notNull(this.gridModel, 'model');

		return this.gridModel;
	}

	set model(value: GridModel) {
		Guard.notNull(value, 'value');

		this.gridModel = value;
	}

	ngOnDestroy() {
		this.disposable.finalize();
	}
}
