import {
	Directive,
	ElementRef,
	ContentChild,
	AfterViewInit,
	Output,
	EventEmitter,
	NgZone
} from '@angular/core';
import { MatChipInput } from '@angular/material/chips';
import { ChipsDirective } from './chips.directive';
import { Keyboard } from 'ng2-qgrid';

@Directive({
	selector: '[q-grid-chips-push]'
})
export class ChipsPushDirective implements AfterViewInit {
	@ContentChild(MatChipInput) inputComponent: MatChipInput;
	@ContentChild('qGridInput') inputElement: ElementRef;

	@Output('q-grid-chips-push') push = new EventEmitter<string>();

	constructor(private zone: NgZone, private chipsDirective: ChipsDirective) { }

	ngAfterViewInit() {
		this.inputComponent.chipEnd.subscribe(e => {
			// we need to override it to prevent default behavior
		});

		const input = this.inputElement.nativeElement;
		this.zone.runOutsideAngular(() =>
			input.addEventListener('keydown', (e: KeyboardEvent) => {
				const code = Keyboard.translate(e.code);
				if (code === 'enter') {
					const value = (input.value || '').trim() as string;
					if (value) {
						this.push.emit(value);

						input.value = '';
						e.stopPropagation();

						this.chipsDirective.tick();
					}
				}
			})
		);
	}
}
