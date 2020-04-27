import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { jobLine } from '@qgrid/core/services/job.line';
import { Fastdom } from '@qgrid/core/services/fastdom';
import { EditService } from '@qgrid/core/edit/edit.service';
import { CellView } from '@qgrid/core/scene/view/cell.view';
import { NavigationModel } from '@qgrid/core/navigation/navigation.model';
import { DomTd } from '../dom/dom';
import { GridEventArg } from '../grid/grid-model';
import { GridPlugin } from '../plugin/grid-plugin';

@Component({
	selector: 'q-grid-cell-handler',
	templateUrl: './cell-handler.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [GridPlugin]
})
export class CellHandlerComponent implements OnInit, AfterViewInit {
	private startCell: CellView = null;
	private initialSelectionMode: 'single' | 'multiple' | 'range' | 'singleOnly' = null;
	private initialEditState: 'view' | 'edit' | 'startBatch' | 'endBatch' = null;

	isMarkerVisible = false;
	@ViewChild('marker', { static: true }) marker: ElementRef;

	constructor(
		private elementRef: ElementRef,
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef
	) {
		this.elementRef.nativeElement.style.display = 'none';
	}

	ngOnInit() {
		const { model, observeReply } = this.plugin;
		const updateHandler = this.updateHandlerFactory();
		const updateMarker = this.updateMarkerFactory();

		observeReply(model.navigationChanged)
			.subscribe(e => {
				updateHandler(e);
				updateMarker(e);
			});

		observeReply(model.editChanged)
			.subscribe(e => {
				if (e.hasChanges('method')) {
					this.isMarkerVisible = e.state.method === 'batch';
					this.cd.detectChanges();
				}
			});
	}

	ngAfterViewInit() {
		this.elementRef.nativeElement.style.display = '';
	}

	updateHandlerFactory() {
		const { model, table } = this.plugin;
		const element = this.elementRef.nativeElement;
		const job = jobLine(150);

		// When navigate first or when animation wasn't applied we need to omit
		// next navigation event to make handler to correct position.
		let isValid = false;
		return (e: GridEventArg<NavigationModel>) => {
			if (e.hasChanges('cell')) {
				const { cell, rowIndex, columnIndex } = e.state;

				if (cell) {
					const oldCell = e.changes.cell.oldValue || {} as CellView;
					const newCell = e.changes.cell.newValue || {} as CellView;
					const oldColumn = oldCell.column || {};
					const newColumn = newCell.column || {};

					// Do not apply animation for columns that have viewWidth assigned
					// because it can be animated too.
					const shouldAnimate =
						!model.drag().isActive
						&& (oldColumn.key === newColumn.key || !(oldColumn.viewWidth || newColumn.viewWidth));

					if (!shouldAnimate) {
						isValid = false;
						return;
					}

					// It can be that the cell object was changed but indices are not.
					isValid =
						oldCell.rowIndex >= 0
						&& oldCell.columnIndex >= 0
						&& (newCell.rowIndex !== oldCell.rowIndex || newCell.columnIndex !== oldCell.columnIndex);

					const domCell = table.body.cell(rowIndex, columnIndex);
					if (isValid) {
						domCell.addClass('q-grid-animate');
						element.classList.add('q-grid-active');

						job(() => {
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

		};
	}

	updateMarkerFactory() {
		const { model, table, observe } = this.plugin;
		const editService = new EditService(model, table);
		const job = jobLine(150);

		let oldCell: DomTd = null;
		observe(model.editChanged)
			.subscribe(e => {
				if (e.hasChanges('state')) {
					if (e.state.state === 'endBatch') {
						model.edit({ state: this.initialEditState });
						editService.doBatch(this.startCell);
						model.selection({ mode: this.initialSelectionMode });

						this.startCell = null;
					}
				}
			});

		return (e: GridEventArg<NavigationModel>) => {
			if (!this.marker) {
				return;
			}

			if (e.hasChanges('cell')) {
				const { rowIndex, columnIndex } = e.state;
				const { method, state } = model.edit();

				const cell = table.body.cell(rowIndex, columnIndex).model();

				if (method === 'batch') {
					if (oldCell) {
						Fastdom.mutate(() => this.marker.nativeElement.remove());
					}

					if (cell) {
						job(() => Fastdom.mutate(() => cell.element.appendChild(this.marker.nativeElement)));
					}

					oldCell = cell;
				}

				if (state === 'startBatch' && !this.startCell) {
					this.startCell = cell;
				}
			}
		};
	}

	startBatchEdit() {
		const { model } = this.plugin;

		this.startCell = model.navigation().cell;
		if (this.startCell) {
			this.initialEditState = model.edit().state;
			this.initialSelectionMode = model.selection().mode;
			model.selection({ mode: 'range' });
			model.edit({ state: 'startBatch' });
		}
	}
}
