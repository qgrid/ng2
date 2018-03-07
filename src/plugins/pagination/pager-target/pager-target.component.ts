import { Component, Optional, OnInit } from '@angular/core';
import { PluginComponent } from '../../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';

@Component({
	selector: 'q-grid-pager-target',
	templateUrl: './pager-target.component.html'
})
export class PagerTargetComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService) {
		super(root);
	}

	private value: string;
	private target: any;

	ngOnInit() {
		this.target = this;
		this.context = {$implicit: this.target};
	}

	setPage(page: string) {
		const pageNumber = Number.parseInt(page);
		const maxAllowed = this.total();

		if (pageNumber > 0 && pageNumber <= maxAllowed) {
			this.model.pagination({current: pageNumber - 1});
		} else {
			this.value = '1';
		}
	}

	total() {
		const pagination = this.model.pagination();
		const count = pagination.count;
		const size = pagination.size;

		return count / size;
	}
}
