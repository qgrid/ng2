import { Component, Input, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PagerView } from 'qgrid-plugins/pager/pager.view';
import { GridPlugin } from 'ngx-qgrid';
import { Disposable } from 'ngx-qgrid';

@Component({
	selector: 'q-grid-pager',
	templateUrl: './pager.component.html',
	providers: [GridPlugin, Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent implements OnInit, OnChanges {
	@Input('size') paginationSize: number;
	@Input('sizeList') paginationSizeList: number[];

	context: { $implicit: PagerView };

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
		private disposable: Disposable
	) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['pagination']);
	}

	ngOnInit() {
		const { model, table } = this.plugin;
		const pager = new PagerView(model, table, this.disposable);
		this.context = { $implicit: pager };

		model.paginationChanged.on(() => this.cd.detectChanges());
	}
}
