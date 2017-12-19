import { Guard } from 'ng2-qgrid/core/infrastructure';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { CommandManager } from 'ng2-qgrid/core/command/command.manager';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';
import { AppError } from 'ng2-qgrid/core/infrastructure';
import { isUndefined } from 'ng2-qgrid/core/utility';
import { Bag } from 'ng2-qgrid/core/dom/bag';
import { ViewCoreService } from 'ng2-qgrid/main/core/view/view-core.service';

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
	public view: ViewCoreService;

	constructor(private changeDetector: ChangeDetectorRef) {}

	get model() {
		Guard.notNull(this.gridModel, 'model');

		return this.gridModel;
	}

	set model(value) {
		this.gridModel = value;
	}

	applyFactory(gf: () => void = null, mode = 'async') {
		return (lf, timeout) => {
			if (isUndefined(timeout)) {
				switch (mode) {
					case 'async': {
						timeout = 0;
						break;
					}
					case 'sync': {
						const result = lf();
						if (gf) {
							gf();
						}

						this.changeDetector.detectChanges();
						return result;
					}
					default:
						throw new AppError('grid', `Invalid mode ${mode}`);
				}
			}

			return setTimeout(() => {
				lf();

				if (gf) {
					gf();
				}
			}, timeout);
		};
	}
}
