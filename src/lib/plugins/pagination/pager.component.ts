import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { PagerView } from 'ng2-qgrid/plugin/pager/pager.view';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-pager',
	templateUrl: './pager.component.html',
	providers: [PluginService]
})
export class PagerComponent implements OnInit, OnChanges {
	@Input('size') paginationSize: number;
	@Input('sizeList') paginationSizeList: number[];

	context: { $implicit: PagerView };

	constructor(private plugin: PluginService) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['pagination']);
	}

	ngOnInit() {
		const pager = new PagerView(this.plugin.model, this.plugin.table);
		this.context = { $implicit: pager };
	}
}
