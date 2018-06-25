import {
	Directive,
	ElementRef,
	ContentChild,
	AfterViewInit,
	Output,
	EventEmitter
} from '@angular/core';
import { MatChipInput } from '@angular/material';
import { Shortcut, Command } from 'ng2-qgrid';

@Directive({
	selector: '[q-grid-chips]'
})
export class ChipsDirective implements AfterViewInit {
	@ContentChild(MatChipInput) input: MatChipInput;
	@ContentChild('chipInput') element: ElementRef;
	@Output() push = new EventEmitter<any>();;

	constructor() { }

	ngAfterViewInit() {
		this.input.chipEnd.subscribe(e => {
			// we need to override it to prevent default behavior
		});

		const input = this.element.nativeElement;
		input.addEventListener('keydown', e => {
			const code = Shortcut.translate(e);
			if (code === 'enter') {
				const value = (input.value || '').trim();
				if (value) {
					this.push.emit(value);

					input.value = '';
					e.stopPropagation();
				}
			}
		});
	}
}
