import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Keyboard } from '@qgrid/core';

const DELIMITER = '/';

@Directive({
	selector: '[q-grid-date-mask]',
})
export class DateMaskDirective {
	@Input('q-grid-date-mask') mask!: string;

	constructor(private elementRef: ElementRef) {
	}

	@HostListener('keypress', ['$event'])
	keyUp(e: KeyboardEvent) {
		if (!this.mask) {
			return;
		}

		const input = this.elementRef.nativeElement as HTMLInputElement;
		const value = input.value || '';
		const maskChar = this.mask[value.length];
		if (!maskChar) {
			e.preventDefault();
			return;
		}

		// tslint:disable-next-line: deprecation
		const code = Keyboard.translate(e.keyCode);
		if (this.isDigit(code)) {
			if (maskChar === DELIMITER) {
				e.preventDefault();
				input.value += DELIMITER + code;
				return;
			}

			const nextMaskChar = this.mask[input.value.length + 1];
			if (nextMaskChar === DELIMITER) {
				e.preventDefault();
				input.value += code + DELIMITER;
			}
		}
	}

	private isDigit(char: string) {
		return /^[0-9]$/i.test(char);
	}
}
