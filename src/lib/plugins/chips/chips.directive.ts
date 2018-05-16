import {
	Directive,
	Input,
	ElementRef,
	ContentChild,
	AfterViewInit
} from '@angular/core';
import { Shortcut } from 'ng2-qgrid/core/shortcut/shortcut';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { MatChipInput } from '@angular/material';

@Directive({
	selector: '[q-grid-chips]'
})
export class ChipsDirective implements AfterViewInit {
	@ContentChild(MatChipInput) public input: MatChipInput;
	@ContentChild('chipInput') public element: ElementRef;

	constructor(private view: ViewCoreService) {}

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
					this.view.edit.cell.value.push(value);
					input.value = '';
					e.stopPropagation();
				}
			}
		});
	}
}
