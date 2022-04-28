import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { VscrollContext, VscrollService } from 'ng2-qgrid';

@Component({
	selector: 'example-scroll-virtual-list-infinite',
	templateUrl: 'example-scroll-virtual-list-infinite.component.html',
	styleUrls: ['example-scroll-virtual-list-infinite.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleScrollVirtualListInfiniteComponent {
	static id = 'scroll-virtual-list-infinite';

	context = this.vscroll.context({
		threshold: 50,
		fetch: (skip, take, d) => {
			const length = skip + take;
			const data = Array.from(Array(length).keys());
			const wnd = data.slice(skip, length);

			this.items.push(...wnd);
			d.resolve(length + take);
		},
	});

	items = [];

	constructor(private vscroll: VscrollService) {
	}

	reset() {
		this.items = [];
		this.context.container.reset();
	}
}
