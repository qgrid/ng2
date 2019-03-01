import { Component, ChangeDetectionStrategy } from '@angular/core';
import { VscrollContext, VscrollService } from 'ng2-qgrid';

@Component({
	selector: 'example-scroll-virtual-list',
	templateUrl: 'example-scroll-virtual-list.component.html',
	styleUrls: ['example-scroll-virtual-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleScrollVirtualListComponent {
	context: VscrollContext;
	items = Array.from(Array(200).keys());

	constructor(vscroll: VscrollService) {
		this.context = vscroll.context({
			threshold: 50
		});
	}
}
