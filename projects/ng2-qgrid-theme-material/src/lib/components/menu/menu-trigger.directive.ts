import {
	Directive,
	ContentChild,
	EventEmitter,
	Output,
	AfterViewInit
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Disposable, Guard } from 'ng2-qgrid';

@Directive({
	selector: '[q-grid-menu-trigger]',
	providers: [Disposable]
})
export class MenuTriggerDirective implements AfterViewInit {
	@ContentChild(MatMenuTrigger, { static: true }) trigger: MatMenuTrigger;
	@Output('q-grid-menu-trigger') close = new EventEmitter<any>();

	constructor(private disposable: Disposable) {
	}

	ngAfterViewInit() {
		Guard.notNull(this.trigger, 'trigger');

		Promise.resolve(null).then(() => this.trigger.openMenu());

		this.disposable.add(
			this.trigger
				.menuClosed
				.subscribe(() => {
					if (this.close) {
						setTimeout(() => this.close.emit(), 10);
					}
				})
		);
	}
}
