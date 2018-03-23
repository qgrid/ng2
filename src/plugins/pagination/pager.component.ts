import { Component, Input, Optional, OnDestroy, OnInit } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { PagerView } from 'ng2-qgrid/plugin/pager/pager.view';

@Component({
	selector: 'q-grid-pager',
	templateUrl: './pager.component.html'
})
export class PagerComponent extends PluginComponent implements OnInit, OnDestroy {
	@Input('size') public paginationSize;
	@Input('sizeList') public paginationSizeList;

	private pager: PagerView;

	constructor( @Optional() root: RootService) {
		super(root);

		this.models = ['pagination'];
	}

	ngOnInit() {
		super.ngOnInit();

		this.pager = new PagerView(this.model);
		this.context = { $implicit: this.pager };
	}

	ngOnDestroy() {
		super.ngOnDestroy();
		
		this.pager.dispose();
	}
}
