import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { jobLine } from 'ng2-qgrid/core/services/job.line';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { Fastdom } from 'ng2-qgrid/core/services/fastdom';
import { EditService } from 'ng2-qgrid/core/edit/edit.service';
import { PathService } from 'ng2-qgrid/core/path/path.service';
import { Cell } from 'ng2-qgrid/core/dom/cell';

@Component({
	selector: 'q-grid-cell-handler',
	templateUrl: './cell-handler.component.html'
})
export class CellHandlerComponent implements OnInit, AfterViewInit {
	private job = jobLine(150);
	private startCell: Cell = null;
	private initialSelectionMode: string = null;
	private initialEditState: string = null;


	constructor(private element: ElementRef, private root: RootService) {
	}

	@ViewChild('marker') marker: ElementRef;

	ngOnInit() {
		const model = this.root.model;
		const table = this.root.table;
		const element = this.element.nativeElement;

		// When navigate first or when animation wasn't applied we need to omit
		// next navigation event to make handler to correct position.
		let isValid = false;

		model.navigationChanged.watch(e => {
			if (e.hasChanges('cell')) {
				const cell = e.state.cell;

				if (cell) {
					const oldColumn = e.changes.cell.oldValue ? e.changes.cell.oldValue.column : {};
					const newColumn = e.changes.cell.newValue ? e.changes.cell.newValue.column : {};

					// Do not apply animation for columns that have viewWidth assigned
					// because it can be animated too.
					const shouldAnimate = oldColumn.key === newColumn.key || !(oldColumn.viewWidth || newColumn.viewWidth);
					if (!shouldAnimate) {
						isValid = false;
						return;
					}

					const domCell = table.body.cell(e.state.rowIndex, e.state.columnIndex);
					if (isValid) {
						domCell.addClass('q-grid-animate');
						element.classList.add('q-grid-active');

						this.job(() => {
							element.classList.remove('q-grid-active');
							domCell.removeClass('q-grid-animate');
						}).catch(() => {
							Fastdom.mutate(() => {
								domCell.removeClass('q-grid-animate');
							});
						});
					}

					Fastdom.measure(() => {
						const target = domCell.element;
						const scrollState = model.scroll();
						const top = (target.offsetTop - scrollState.top) + 'px';
						const left = (target.offsetLeft - (cell.column.pin ? 0 : scrollState.left)) + 'px';
						const width = target.offsetWidth + 'px';
						const height = target.offsetHeight + 'px';

						Fastdom.mutate(() => {
							element.style.top = top;
							element.style.left = left;
							element.style.width = width;
							element.style.height = height;
						});
					});

					isValid = true;
				}
			}
		});
	}

	ngAfterViewInit() {
		const model = this.root.model;
		const editService = new EditService(model, this.root.table);
		let prevCell = null;

		model.editChanged.on(e => {
			if (e.hasChanges('state')) {
				if (e.state.state === 'endBatch') {
					editService.doBatch(this.startCell);
					model.edit({ state: this.initialEditState });
					model.selection({ mode: this.initialSelectionMode });

					this.startCell = null;
				}
			}
		});

		model.navigationChanged.watch(e => {
			if (!this.marker) {
				return;
			}

			if (e.hasChanges('cell')) {
				const cell = e.state.cell;

				if (model.edit().method === 'batch') {
					if (prevCell) {
						Fastdom.mutate(() => prevCell.removeChild(this.marker.nativeElement));
					}

					const element = cell.model.element;
					Fastdom.mutate(() => element.appendChild(this.marker.nativeElement));
					prevCell = element;
				}

				if (!this.startCell && model.edit().state === 'startBatch') {
					this.startCell = cell;
				}
			}
		});
	}

	startBatchEdit(e) {
		const model = this.root.model;
		model.selection({ mode: 'range' });

		const pathFinder = new PathService(this.root.bag.body);
		const cell = pathFinder.cell(e.path);

		this.startCell = model.navigation().cell;
		if (this.startCell) {
			this.initialEditState = model.edit().state;
			this.initialSelectionMode = model.selection().mode;
			model.edit({ state: 'startBatch' });
		}
	}

	get isMarkerVisible() {
		return this.root.model.edit().method === 'batch';
	}
}
