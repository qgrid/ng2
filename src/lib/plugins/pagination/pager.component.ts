import { Component, Input, Optional, OnDestroy, OnInit } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command/command';
import { PagerView } from 'ng2-qgrid/plugin/pager/pager.view';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-pager',
	templateUrl: './pager.component.html',
	providers: [PluginService]
})
export class PagerComponent implements OnInit {
	@Input('size') paginationSize: number;
	@Input('sizeList') paginationSizeList: number[];

	context: { $implicit: PagerView };

	constructor(private plugin: PluginService) {
		this.models = ['pagination'];
	}

	ngOnInit() {
		const pager = new PagerView(this.plugin.model);
		this.context = { $implicit: pager };
	}
}
