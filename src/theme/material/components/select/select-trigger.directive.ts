import {
	Directive,
	ContentChild,
	EventEmitter,
	Output,
	AfterContentInit
} from '@angular/core';
import { MatSelect } from '@angular/material';

@Directive({
	selector: '[q-grid-select-trigger]'
})
export class SelectTriggerDirective implements AfterContentInit {
	@ContentChild(MatSelect) public trigger: MatSelect;
	@Output('q-grid-select-trigger') public onClose = new EventEmitter<any>();

	constructor() {}

	ngAfterContentInit() {
		this.trigger.selectionChange.subscribe(() => {
			this.onClose.emit();
		});
	}
}
