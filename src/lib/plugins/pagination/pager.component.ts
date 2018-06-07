import { Component, Input, Optional, OnDestroy, OnInit } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command/command';
import { PluginComponent } from '../plugin.component';
import { RootService } from '../../infrastructure/component/root.service';
import { PagerView } from 'ng2-qgrid/plugin/pager/pager.view';

@Component({
	selector: 'q-grid-pager',
	templateUrl: './pager.component.html'
})
export class PagerComponent extends PluginComponent {
	@Input('size') paginationSize: number;
	@Input('sizeList') paginationSizeList: number[];

	constructor(@Optional() root: RootService) {
		super(root);

		this.models = ['pagination'];
	}

	onReady() {
		const pager = new PagerView(this.model);
		this.context = { $implicit: pager };
	}
}
