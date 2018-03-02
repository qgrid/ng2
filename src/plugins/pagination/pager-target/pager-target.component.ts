import { Component, Input, Optional, OnDestroy, OnInit } from '@angular/core';
import { PluginComponent } from '../../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-pager-target',
	templateUrl: './pager-target.component.html'
})
export class PagerTargetComponent extends PluginComponent implements OnInit {
	constructor( @Optional() root: RootService) {
		super(root);
	}

	private target: any;

	ngOnInit() {
		this.target = this;
		this.context = { $implicit: this.target };
	}

	setPage(page: string) {
		const pageNumber = Number.parseInt(page) - 1;
		const pagination = this.model.pagination();

		pagination.current = pageNumber;
	}

}
