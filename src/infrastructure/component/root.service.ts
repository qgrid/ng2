import {Guard} from '@grid/core/infrastructure';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {CommandManager} from '@grid/infrastructure/command';
import {Model} from '@grid/core/infrastructure/model';
import {Table} from '@grid/core/dom/table';
import {AppError} from '@grid/core/infrastructure';
import {isUndefined} from '@grid/core/utility';

@Injectable()
export class RootService {
	private gridModel: Model = null;
	public markup: any = {};
	public bag = new Map<HTMLElement, any>();
	public table: Table = null;
	public commandManager;

	constructor(private changeDetector: ChangeDetectorRef) {
		this.markup.document = document;
	}

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

				this.changeDetector.detectChanges();
			}, timeout);
		};
	}
}
