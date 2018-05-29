import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jobLine } from 'ng2-qgrid/core/services/job.line';
import { Fastdom } from 'ng2-qgrid/core/services/fastdom';
import { EditService } from 'ng2-qgrid/core/edit/edit.service';
import { CellView } from 'ng2-qgrid/core/scene/view/cell.view';
import { RootService } from '../../../infrastructure/component/root.service';
import { ViewCoreService } from '../../../main/core/view/view-core.service';

@Component({
	selector: 'q-grid-cell-handler',
	templateUrl: './cell-handler.component.html'
})
export class CellHandlerComponent implements OnInit, AfterViewInit {
	private job = jobLine(150);
	private markerJob = jobLine(150);
	private startCell: CellView = null;
	private initialSelectionMode: 'single' | 'multiple' | 'range' = null;
	private initialEditState: 'view' | 'edit' | 'startBatch' | 'endBatch' = null;

	constructor(private element: ElementRef, private root: RootService, private view: ViewCoreService) {
		Fastdom.mutate(() => element.nativeElement.style.visibility = 'hidden');
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
		Fastdom.mutate(() => this.element.nativeElement.style.visibility = 'visible');
		const model = this.root.model;
		const editService = new EditService(model, this.root.table);
		let prevCell = null;

		model.editChanged.on(e => {
			if (e.hasChanges('state')) {
				if (e.state.state === 'endBatch') {
					model.edit({ state: this.initialEditState });
					editService.doBatch(this.startCell);
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
						Fastdom.mutate(() => this.marker.nativeElement.remove());
					}

					prevCell = cell.model;
					if (cell) {
						this.markerJob(() => {
							Fastdom.mutate(() => prevCell.element.appendChild(this.marker.nativeElement));
						});
					} else {
						prevCell = null;
					}
				}

				if (!this.startCell && model.edit().state === 'startBatch') {
					this.startCell = cell;
				}
			}
		});
	}

	startBatchEdit(e) {
		const model = this.root.model;

		this.startCell = model.navigation().cell;
		if (this.startCell) {
			this.initialEditState = model.edit().state;
			this.initialSelectionMode = model.selection().mode;
			model.selection({ mode: 'range' });
			model.edit({ state: 'startBatch' });
		}
	}

	get isMarkerVisible() {
		const model = this.root.model;
		const cell: CellView = model.navigation().cell;

		if (cell) {
			const type = cell.column.type;
			return model.edit().method === 'batch' && type !== 'id';
		}

		return false;
	}
}
