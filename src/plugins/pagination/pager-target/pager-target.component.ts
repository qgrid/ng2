import {
	Component, Optional, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit,
	ChangeDetectorRef
} from '@angular/core';
import { PluginComponent } from '../../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import {Observable} from 'rxjs/Observable';


@Component({
	selector: 'q-grid-pager-target',
	templateUrl: './pager-target.component.html'
})
export class PagerTargetComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService, private cdRef: ChangeDetectorRef) {
		super(root);
	}

	private value: any;
	private target: any;

	ngOnInit() {
		this.target = this;
		this.context = {$implicit: this.target};
	}

	setPage(page: number) {
		const maxAllowed = this.total();

		if (page > 0 && page <= maxAllowed) {
			this.model.pagination({current: page - 1});
		}
	}

	attachEventListener() {
		const input: HTMLInputElement = document.querySelector('#q-grid-menu-input');

		input.addEventListener('keydown', (event: KeyboardEvent) => {
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
		});
	}

	total() {
		const pagination = this.model.pagination();
		const count = pagination.count;
		const size = pagination.size;

		return count / size;
	}
}
