import { Component, Input, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PagerPlugin } from '@qgrid/plugins/pager/pager.plugin';
import { GridPlugin, Disposable } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-pager',
	templateUrl: './pager.component.html',
	providers: [GridPlugin, Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent implements OnInit, OnChanges {
	@Input('size') paginationSize: number;
	@Input('sizeList') paginationSizeList: number[];

	context: { $implicit: PagerPlugin };

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
		const { model, table, observe } = this.plugin;
		const pager = new PagerPlugin(model, table, this.disposable);
		this.context = { $implicit: pager };

		observe(model.paginationChanged)
			.subscribe(() => this.cd.detectChanges());
	}
}
