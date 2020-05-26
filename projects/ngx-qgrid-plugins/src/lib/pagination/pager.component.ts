import { Component, Input, OnInit, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GridPlugin, StateAccessor } from '@qgrid/ngx';
import { PagerPlugin } from '@qgrid/plugins/pager/pager.plugin';
import { PaginationState } from '@qgrid/core/pagination/pagination.state';

@Component({
	selector: 'q-grid-pager',
	templateUrl: './pager.component.html',
	providers: [GridPlugin, StateAccessor],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent implements OnInit, OnChanges {
	private pagerState = this.stateAccessor.setter(PaginationState);

	context: { $implicit: PagerPlugin, plugin: PagerComponent };

	@Input('size') set paginationSize(size: number) { this.pagerState({ size }); }
	@Input('sizeList') set paginationSizeList(sizeList: number[]) { this.pagerState({ sizeList }); }
	@Input('showCount') showCount = false;

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
		private stateAccessor: StateAccessor,
	) {
	}

	ngOnChanges() {
		const { model } = this.plugin;
		this.stateAccessor.write(model);
	}

	ngOnInit() {
		const { model, observe } = this.plugin;
		const pager = new PagerPlugin(this.plugin);
		this.context = { $implicit: pager, plugin: this };

		observe(model.paginationChanged)
			.subscribe(() => this.cd.detectChanges());
	}
}
