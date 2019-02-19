import {
	Directive,
	ElementRef,
	ContentChild,
	AfterViewInit,
	Output,
	EventEmitter
} from '@angular/core';
import { MatChipInput } from '@angular/material';
import { Shortcut } from 'ng2-qgrid';

@Directive({
	selector: '[q-grid-chips]'
})
export class ChipsDirective implements AfterViewInit {
	@ContentChild(MatChipInput) input: MatChipInput;
	@ContentChild('chipInput') elementRef: ElementRef;
	@Output() push = new EventEmitter<string>();

	ngAfterViewInit() {
		this.input.chipEnd.subscribe(e => {
			// we need to override it to prevent default behavior
		});

		const input = this.elementRef.nativeElement;
		input.addEventListener('keydown', e => {
			const code = Shortcut.translate(e);
			if (code === 'enter') {
				const value = (input.value || '').trim() as string;
				if (value) {
					this.push.emit(value);

					input.value = '';
					e.stopPropagation();
				}
			}
		});
	}
}
