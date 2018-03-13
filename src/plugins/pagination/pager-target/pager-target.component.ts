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

	private value: any;
	private target: any;
	private input: HTMLInputElement;

	ngOnInit() {
		this.target = this;
		this.context = {$implicit: this.target};
	}

	setPage(page: number) {
		this.model.pagination({current: page - 1});
	}

	handleKeyDown(event: KeyboardEvent) {
		event.preventDefault();

		const isEnter = event.key === 'Enter';
		const key = Number.parseInt(event.key) || 0;
		const total = this.total();

		if (isEnter) {
			this.setPage(this.value);
		} else if (key <= total && key >= 1) {
			setTimeout(() => this.value = key);
		} else {
			setTimeout(() => this.value = '');
		}
	}

	total() {
		const pagination = this.model.pagination();
		const count = pagination.count;
		const size = pagination.size;

		return count / size;
	}
}
