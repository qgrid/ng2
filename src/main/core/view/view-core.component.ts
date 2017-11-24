import {
	Component, OnDestroy, OnInit, Optional, DoCheck, ElementRef, ViewChild, Renderer2,
	AfterViewInit, HostBinding, HostListener, QueryList, ViewChildren
} from '@angular/core';
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

import {  PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import {TableCoreComponent} from 'ng2-qgrid/main';

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
		private gridService: GridService,
		private renderer: Renderer2) {
		super();
	}

	handleScrollbarVisibility(status: string) {
		const element = document.getElementsByClassName('ps__rail-y')[2] as HTMLElement;
		element.style.opacity = status === 'reveal' ? '0.6' : '0';
	}

	ngOnInit() {
		super.ngOnInit();

		this.view.init();

		const model = this.model;
		const gridService = this.gridService.service(model);

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

		const triggers = model.data().triggers;
		// TODO: think about invalidation queue
		let needInvalidate = true;
		Object.keys(triggers)
			.forEach(name =>
				this.using(model[name + 'Changed']
					.watch(e => {
						const changes = Object.keys(e.changes);
						if (e.tag.behavior !== 'core' && triggers[name].find(key => changes.indexOf(key) >= 0)) {
							needInvalidate = false;
							gridService.invalidate(name, e.changes);
						}
					})));

		if (needInvalidate) {
			gridService.invalidate('grid');
		}
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
		this.view.style.invalidate();
	}
}
