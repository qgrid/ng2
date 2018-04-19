import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { jobLine } from 'ng2-qgrid/core/services/job.line';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { Fastdom } from 'ng2-qgrid/core/services/fastdom';
import { EditService } from 'ng2-qgrid/core/edit/edit.service';
import { PathService } from 'ng2-qgrid/core/path/path.service';

@Component({
	selector: 'q-grid-cell-handler',
	templateUrl: './cell-handler.component.html'
})
export class CellHandlerComponent implements OnInit, AfterViewInit {
	private job = jobLine(150);

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
		const selectionState = model.selection;
		const editService = new EditService(model, this.root.table);
		const initialSelectionMode = selectionState().mode;
		const initialEditState = model.edit().state;
		let previousCell = null;

		model.editChanged.on(e => {
			if (e.hasChanges('state')) {
				if (e.state.state === 'endBatch') {

					editService.doBatch(e.state.startCell);
					model.edit({state: initialEditState, startCell: null});
					selectionState({mode: initialSelectionMode});
				}
			}
		});

		model.navigationChanged.watch(e => {
			if (e.hasChanges('cell')) {
				const currentCell = e.state.cell;

				if (model.edit().method === 'batch') {
					if (previousCell) {
						Fastdom.mutate(() => {
							previousCell.removeChild(this.marker.nativeElement);
						});
					}

					const element = currentCell.model.element;

					Fastdom.mutate(() => {
						element.appendChild(this.marker.nativeElement);
					});

					previousCell = element;
				}
			}
		});
	}

	startBatchEdit(e) {
		this.root.model.selection({mode: 'range'});

		const pathFinder = new PathService(this.root.bag.body);
		const cell = pathFinder.cell(e.path);
		const edit = this.root.model.edit;

		edit({state: 'startBatch', startCell: cell});
	}

	get isMarkerVisible() {
		const model = this.root.model;

		return model.edit().method === 'batch';
	}
}
