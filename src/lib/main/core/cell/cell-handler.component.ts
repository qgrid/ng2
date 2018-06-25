import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jobLine } from 'ng2-qgrid/core/services/job.line';
import { Fastdom } from 'ng2-qgrid/core/services/fastdom';
import { EditService } from 'ng2-qgrid/core/edit/edit.service';
import { CellView } from 'ng2-qgrid/core/scene/view/cell.view';
import { ModelEventArg } from 'ng2-qgrid/core/infrastructure/model';
import { NavigationModel } from 'ng2-qgrid/core/navigation/navigation.model';
import { Td } from 'ng2-qgrid/core/dom/td';
import { RootService } from '../../../infrastructure/component/root.service';
import { ViewCoreService } from '../../../main/core/view/view-core.service';

@Component({
	selector: 'q-grid-cell-handler',
	templateUrl: './cell-handler.component.html'
})
export class CellHandlerComponent implements OnInit, AfterViewInit {
	@ViewChild('marker') marker: ElementRef;

	private startCell: CellView = null;
	private initialSelectionMode: 'single' | 'multiple' | 'range' = null;
	private initialEditState: 'view' | 'edit' | 'startBatch' | 'endBatch' = null;

	constructor(private element: ElementRef, private root: RootService, private view: ViewCoreService) {
		this.element.nativeElement.style.display = 'none';
	}

	ngOnInit() {
		const updateHandler = this.updateHandlerFactory();
		const updateMarker = this.updateMarkerFactory();

		this.root.model.navigationChanged.watch(e => {
			updateHandler(e);
			updateMarker(e);
		});
	}

	ngAfterViewInit() {
		this.element.nativeElement.style.display = '';
	}

	updateHandlerFactory() {
		const { model, table } = this.root;
		const element = this.element.nativeElement;
		const job = jobLine(150);

		// When navigate first or when animation wasn't applied we need to omit
		// next navigation event to make handler to correct position.
		let isValid = false;
		return (e: ModelEventArg<NavigationModel>) => {
			if (e.hasChanges('cell')) {
				const { cell } = e.state;

				if (cell) {
					const oldColumn = e.changes.cell.oldValue ? e.changes.cell.oldValue.column : {};
					const newColumn = e.changes.cell.newValue ? e.changes.cell.newValue.column : {};

					// Do not apply animation for columns that have viewWidth assigned
					// because it can be animated too.
					const shouldAnimate = !model.drag().isActive && (oldColumn.key === newColumn.key || !(oldColumn.viewWidth || newColumn.viewWidth));
					if (!shouldAnimate) {
						isValid = false;
						return;
					}

					const { rowIndex, columnIndex } = e.state;
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
		const { model, table } = this.root;
		const editService = new EditService(model, table);
		const job = jobLine(150);

		let oldCell: Td = null;
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

		return (e: ModelEventArg<NavigationModel>) => {
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
						job(() => Fastdom.mutate(() => oldCell.element.appendChild(this.marker.nativeElement)));
					}

					oldCell = cell;
				}

				if (state === 'startBatch' && !this.startCell) {
					this.startCell = cell;
				}
			}
		};
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
		const { column } = model.navigation();

		if (column) {
			const type = column.type;
			return model.edit().method === 'batch';
		}

		return false;
	}
}