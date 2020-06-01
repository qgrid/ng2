import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CellView } from '@qgrid/core/scene/view/cell.view';
import { EditService } from '@qgrid/core/edit/edit.service';
import { Fastdom } from '@qgrid/core/services/fastdom';
import { GridEventArg } from '../grid/grid-model';
import { GridPlugin } from '../plugin/grid-plugin';
import { jobLine } from '@qgrid/core/services/job.line';
import { NavigationState } from '@qgrid/core/navigation/navigation.state';

@Component({
	selector: 'q-grid-cell-handler',
	templateUrl: './cell-handler.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [GridPlugin]
})
export class CellHandlerComponent implements OnInit, AfterViewInit {
	private endBatchEdit: () => void;

	canEditBatch = false;
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

		observeReply(model.navigationChanged)
			.subscribe(e => updateHandler(e));

		observeReply(model.editChanged)
			.subscribe(e => {
				if (e.hasChanges('method')) {
					this.canEditBatch = e.state.method === 'batch';
					this.cd.markForCheck();
					this.cd.detectChanges();
				}

				if (e.hasChanges('status')) {
					if (e.state.status === 'endBatch' && this.endBatchEdit) {
						this.endBatchEdit();
						this.endBatchEdit = null;
					}
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
		return (e: GridEventArg<NavigationState>) => {
			if (e.hasChanges('cell')) {
				const { cell } = e.state;

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

					const domCell = table.body.cell(cell.rowIndex, cell.columnIndex);
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

						const headHeight = table.view.height('head-mid');

						const top = Math.max(headHeight, (target.offsetTop - scrollState.top));
						const left = (target.offsetLeft - (cell.column.pin === 'mid' ? scrollState.left : 0));
						const width = target.offsetWidth;
						const height = target.offsetHeight;

						Fastdom.mutate(() => {
							element.style.top = top + 'px';
							element.style.left = left + 'px';
							element.style.width = width + 'px';
							element.style.height = height + 'px';
						});
					});

					isValid = true;
				}
			}

		};
	}

	startBatchEdit() {
		const { model } = this.plugin;

		const { cell: startCell } = model.navigation();
		if (startCell) {
			const editService = new EditService(this.plugin);
			this.endBatchEdit = editService.startBatch(startCell);
		}
	}
}
