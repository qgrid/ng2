import { Component, Input, Optional, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command/command';
import { PagerView } from 'ng2-qgrid/plugin/pager/pager.view';
import { PluginService } from '../plugin.service';
import { RootService } from '../../infrastructure/component/root.service';

@Component({
	selector: 'q-grid-pager',
	templateUrl: './pager.component.html',
	providers: [PluginService]
})
export class PagerComponent implements OnInit, OnChanges {
	@Input('size') paginationSize: number;
	@Input('sizeList') paginationSizeList: number[];

	context: { $implicit: PagerView };

	constructor(private root: RootService, private plugin: PluginService) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['pagination']);
	}

	ngOnInit() {
		this.plugin.model.pagination().theme = this.root.model.style().classList;

		const pager = new PagerView(this.plugin.model, this.plugin.table);
		this.context = { $implicit: pager };
	}
}
