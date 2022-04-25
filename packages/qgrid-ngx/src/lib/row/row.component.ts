import {
ChangeDetectionStrategy,
Component,
Input,
OnChanges,
OnInit
} from '@angular/core'
import {
Command,
RowDetails,
RowState,
RowStateMode,
RowStateUnit
} from '@qgrid/core'
import { GridPlugin } from '../plugin/grid-plugin';
import { StateAccessor } from '../state/state-accessor';
import { TemplateHostService } from '../template/template-host.service';

// TODO: move it to plugins

@Component({
	selector: 'q-grid-row',
	template: '<ng-content></ng-content
>',
	providers: [
		TemplateHostService,
		GridPlugin,
		StateAccessor,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent implements OnChanges, OnInit {
	private rowAccessor = this.stateAccessor.setter(RowState);

	private toggleStatus = new Command({
		execute: row => {
			const { view } = this.plugin;
			return view.rowDetails.toggleStatus.execute(row);
		},
		canExecute: row => {
			if (row instanceof RowDetails) {
				return false;
			}

			const { view } = this.plugin;
			return view.rowDetails.toggleStatus.canExecute(row);
		},
	});

	@Input() set mode(mode: RowStateMode) { this.rowAccessor({ mode }); }
	@Input() set unit(unit: RowStateUnit) { this.rowAccessor({ unit }); }
	@Input() set canMove(canMove: boolean) { this.rowAccessor({ canMove }); }
	@Input() set canResize(canResize: boolean) { this.rowAccessor({ canResize }); }
	@Input() set minHeight(minHeight) { this.rowAccessor({ minHeight }); }
	@Input() set height(height) { this.rowAccessor({ height }); }

	@Input() behavior = [];

	constructor(
		private plugin: GridPlugin,
		private stateAccessor: StateAccessor,
		templateHost: TemplateHostService,
	) {
		templateHost.key = source => `body-cell-row-${source}.tpl.html`;
	}

	ngOnInit() {
		const { model, observe } = this.plugin;

		if (this.behavior.indexOf('expandOnShortcut') >= 0) {
			observe(model.keyboardChanged)
				.subscribe(e => {
					const { codes, status } = e.state;
					if (status === 'down') {
						switch (codes[0]) {
							// TODO: replace it from row state shortcut property.
							case 'enter':
							case 'space': {
								const { cell } = model.navigation();
								if (cell) {
									const { row, column } = cell;
									if (column.type !== 'row-expand' && this.toggleStatus.canExecute(row)) {
										this.toggleStatus.execute(row);
									}
								}
								break;
							}
						}
					}
				});

			if (this.behavior.indexOf('expandOnClick') >= 0) {
				observe(model.mouseChanged)
					.subscribe(e => {
						const { code, status, target } = e.state;
						if (code === 'left' && status === 'up') {
							if (target && target.column.type !== 'row-expand') {
								if (this.toggleStatus.canExecute(target.row)) {
									this.toggleStatus.execute(target.row);
								}
							}
						}
					});
			}
		}

		if (this.behavior.indexOf('expandOnDblClick') >= 0) {
			let firstClickTarget = null;

			observe(model.mouseChanged)
				.subscribe(e => {
					const { code, timestamp } = e.changes;
					if (e.state.status === 'release' && code?.oldValue === 'left') {
						const target = e.changes.target?.oldValue;
						if (firstClickTarget === null) {
							firstClickTarget = target;
						} else {
							const dblClickInterval = 300;
							if (firstClickTarget === target && timestamp.newValue - timestamp.oldValue <= dblClickInterval) {
								if (target.column.type !== 'row-expand') {
									if (this.toggleStatus.canExecute(target.row)) {
										this.toggleStatus.execute(target.row);
									}
								}
							}

							firstClickTarget = null;
						}
					}
				});
		}
	}

	ngOnChanges() {
		const { model } = this.plugin;
		this.stateAccessor.write(model);
	}
}
