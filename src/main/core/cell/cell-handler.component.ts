import { Component, ElementRef } from '@angular/core';
import { jobLine } from 'ng2-qgrid/core/services/job.line';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-cell-handler',
	templateUrl: './cell-handler.component.html'
})
export class CellHandlerComponent {

	private job = jobLine(150);
	constructor(private element: ElementRef, private root: RootService) {
	}

	ngOnInit() {
		const model = this.root.model;
		const table = this.root.table;
		const element = this.element.nativeElement;
		model.focusChanged.on(e => {
			if (e.hasChanges('rowIndex') || e.hasChanges('columnIndex')) {
				const cell = table.body.cell(e.state.rowIndex, e.state.columnIndex);
				const cellModel = cell.model();
				if (cellModel) {
					element.classList.add('q-grid-active');
					cell.addClass('q-grid-animate');
					const target = cell.element;
					const scrollState = model.scroll();

					element.style.top = (target.offsetTop - scrollState.top) + 'px';
					element.style.left = (target.offsetLeft - (cellModel.column.pin ? 0 : scrollState.left)) + 'px';
					element.style.width = target.offsetWidth + 'px';
					element.style.height = target.offsetHeight + 'px';
					this.job(() => {
						element.classList.remove('q-grid-active');
						cell.removeClass('q-grid-animate');
					}).catch(() => {
						cell.removeClass('q-grid-animate');
					});
				}
			}
		});
	}
}
