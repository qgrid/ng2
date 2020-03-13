import { Component, Input, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PagerView } from 'ng2-qgrid/plugin/pager/pager.view';
import { PluginService } from '../plugin.service';
import { Disposable } from '../../infrastructure/disposable';

@Component({
	selector: 'q-grid-pager',
	templateUrl: './pager.component.html',
	providers: [PluginService, Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent implements OnInit, OnChanges {
	@Input('size') paginationSize: number;
	@Input('sizeList') paginationSizeList: number[];

	context: { $implicit: PagerView };

	constructor(
		private plugin: PluginService,
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
