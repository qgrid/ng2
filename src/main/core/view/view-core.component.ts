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

@Component({
	selector: 'q-grid-core-view',
	templateUrl: './view-core.component.html',
	providers: [
		ViewCoreService,
		CellService
	]
})
export class ViewCoreComponent extends NgComponent implements OnInit, OnDestroy, DoCheck {
	constructor( @Optional() private root: RootService,
		private view: ViewCoreService,
		private gridService: GridService) {
		super();
	}

	ngOnInit() {
		super.ngOnInit();

		this.view.init();

		const model = this.model;
		const gridService = this.gridService.service(model);
		const sceneJob = jobLine(10);
		const invalidateJob = jobLine(10);

		// model.selectionChanged.watch(e => {
		//   // TODO: add event
		//   // if (e.hasChanges('entries')) {
		//   //   this.root.selectionChanged.emit({
		//   //     state: model.selection(),
		//   //     changes: e.changes
		//   //   });
		//   // }
		//
		// });

		model.sceneChanged.watch(e => {
			if (e.hasChanges('round')) {
				Log.info(e.tag.source, `scene ${e.state.round}`);

				if (e.state.status === 'start') {
					sceneJob(() => {
						Log.info(e.tag.source, 'scene stop');

						model.scene({
							round: 0,
							status: 'stop'
						}, {
								source: 'view.core',
								behavior: 'core'
							});
					});
				}
			}
		});

		const triggers = model.data().triggers;

		invalidateJob(() => gridService.invalidate('grid'));
		Object.keys(triggers)
			.forEach(name =>
				this.using(model[name + 'Changed']
					.watch(e => {
						const changes = Object.keys(e.changes);
						if (e.tag.behavior !== 'core' && triggers[name].find(key => changes.indexOf(key) >= 0)) {
							invalidateJob(() => gridService.invalidate(name, e.changes));
						}
					})));
	}

	ngOnDestroy() {
		super.ngOnDestroy();
		this.view.destroy();
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
