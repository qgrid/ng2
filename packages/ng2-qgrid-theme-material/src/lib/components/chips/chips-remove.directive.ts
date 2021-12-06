import {
	Directive,
	ContentChild,
	AfterViewInit,
	Output,
	EventEmitter
} from '@angular/core';
import { ChipsDirective } from './chips.directive';
import { MatChip } from '@angular/material/chips';

@Directive({
	selector: '[q-grid-chips-remove]'
})
export class ChipsRemoveDirective implements AfterViewInit {
	@ContentChild(MatChip) list: MatChip;
	@Output('q-grid-chips-remove') remove = new EventEmitter<any>();

	constructor(private chipsDirective: ChipsDirective) { }

	ngAfterViewInit() {
		this.list.removed.subscribe(() => {
			if (this.remove) {
				this.remove.emit();
				this.chipsDirective.tick();
			}
		});
	}
}
