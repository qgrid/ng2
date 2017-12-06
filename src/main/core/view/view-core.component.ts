import { Component, OnDestroy, OnInit, Optional, DoCheck } from '@angular/core';
import { NgComponent, RootService } from 'ng2-qgrid/infrastructure/component';
import { Table } from 'ng2-qgrid/core/dom';
import { BodyView } from 'ng2-qgrid/core/body';
import { HeadView } from 'ng2-qgrid/core/head';
import { FootView } from 'ng2-qgrid/core/foot';
import { LayoutView } from 'ng2-qgrid/core/layout';
import { GroupView } from 'ng2-qgrid/core/group';
import { PivotView } from 'ng2-qgrid/core/pivot';
import { NavigationView } from 'ng2-qgrid/core/navigation';
import { HighlightView } from 'ng2-qgrid/core/highlight';
import { SortView } from 'ng2-qgrid/core/sort';
import { FilterView } from 'ng2-qgrid/core/filter';
import { EditView } from 'ng2-qgrid/core/edit';
import { SelectionView } from 'ng2-qgrid/core/selection';
import { PaginationView } from 'ng2-qgrid/core/pagination';
import { StyleView } from 'ng2-qgrid/core/style';
import { ColumnView } from 'ng2-qgrid/core/column';
import { ScrollView } from 'ng2-qgrid/core/scroll';
import { RowDetailsView } from 'ng2-qgrid/core/row-details';
import { isUndefined } from 'ng2-qgrid/core/utility';
import { PipeUnit } from 'ng2-qgrid/core/pipe/pipe.unit';
import { AppError } from 'ng2-qgrid/core/infrastructure';
import { ViewCoreService } from './view-core.service';
import { GridService } from 'ng2-qgrid/main/grid';
import { CellService } from '../cell';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { Log } from 'ng2-qgrid/core/infrastructure';
import { jobLine } from 'ng2-qgrid/core/services';
import { ViewCtrl } from 'ng2-qgrid/core/view/view.ctrl';
import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
	selector: 'q-grid-core-view',
	templateUrl: './view-core.component.html',
	providers: [
		ViewCoreService,
		CellService
	]
})
export class ViewCoreComponent extends NgComponent implements OnInit, OnDestroy, DoCheck {
	private ctrl: ViewCtrl;

	constructor( @Optional() private root: RootService,
		private view: ViewCoreService,
		private gridService: GridService) {
		super();
	}

	ngOnInit() {
		super.ngOnInit();

		const model = this.root.model;

		this.view.init();

		const gridService = this.gridService.service(model);
		this.ctrl = new ViewCtrl(model, this.view, gridService);
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.view.destroy();
		this.ctrl.dispose();
	}

	get model() {
		return this.root.model;
	}

	get visibility() {
		return this.model.visibility();
	}

	ngDoCheck() {
		const style = this.view.style;
		if (style.needInvalidate()) {
			const rowMonitor = style.monitor.row;
			const cellMonitor = style.monitor.cell;

			const domCell = cellMonitor.enter();
			const domRow = rowMonitor.enter();
			try {
				style.invalidate(domCell, domRow);
			} finally {
				rowMonitor.exit();
				cellMonitor.exit();
			}
		}
	}
}
