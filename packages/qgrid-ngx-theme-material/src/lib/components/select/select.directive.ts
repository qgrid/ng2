import { Directive, AfterViewInit, ContentChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Directive({
	selector: '[q-grid-select]',
})
export class SelectDirective implements AfterViewInit {
	@ContentChild(MatSelect) private input: MatSelect;

	ngAfterViewInit() {
		this.input.focus();
		setTimeout(() => this.input.open(), 10);
	}
}
