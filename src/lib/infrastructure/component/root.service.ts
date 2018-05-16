import { Injectable } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { CommandManager } from 'ng2-qgrid/core/command/command.manager';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';
import { isUndefined } from 'ng2-qgrid/core/utility/index';
import { Bag } from 'ng2-qgrid/core/dom/bag';

@Injectable()
export class RootService {
	private gridModel: Model = null;
	public markup: any = {};
	public bag = {
		head: new Bag(),
		body: new Bag(),
		foot: new Bag()
	};

	public table: Table = null;
	public commandManager;

	constructor() {}

	get model() {
		Guard.notNull(this.gridModel, 'model');

		return this.gridModel;
	}

	set model(value) {
		this.gridModel = value;
	}
}
