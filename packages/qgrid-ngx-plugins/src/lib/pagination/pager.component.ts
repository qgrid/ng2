import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	OnInit
} from '@angular/core';
import { PaginationState, PaginationStateMode } from '@qgrid/core';
import { GridPlugin, StateAccessor } from '@qgrid/ngx';
import { PagerPlugin } from '@qgrid/plugins';

@Component({
	selector: 'q-grid-pager',
	templateUrl: './pager.component.html',
	providers: [GridPlugin, StateAccessor],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent implements OnInit, OnChanges {
	private pagerState = this.stateAccessor.setter(PaginationState);

	context: { $implicit: PagerPlugin };

	@Input('size') set size(size: number) { this.pagerState({ size }); }
	@Input('sizeList') set sizeList(sizeList: number[]) { this.pagerState({ sizeList }); }
	@Input('mode') set mode(mode: PaginationStateMode) { this.pagerState({ mode }); }

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
		this.context = { $implicit: pager };

		observe(model.paginationChanged)
			.subscribe(() => this.cd.detectChanges());
	}
}
