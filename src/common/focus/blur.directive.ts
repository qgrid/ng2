import {Directive, Renderer2, ElementRef, OnInit, Input} from '@angular/core';
import {ViewCoreService} from '@grid/main/core/view';

@Directive({
	selector: '[q-grid-blur]'
})
export class BlurDirective implements OnInit {
	private nativeElement: Node;
	private inputElement: any;

	@Input('q-grid-blur') onBlur: Function;

	constructor(private renderer: Renderer2, private elementRef: ElementRef) {
		this.nativeElement = elementRef.nativeElement;
	}

	ngOnInit() {
		this.inputElement = this.renderer.selectRootElement('input');
		if (!this.inputElement) {
			throw Error('Required Input elemement is not found');
		}

		this.renderer.listen(this.inputElement, 'blur', () => {
			setTimeout(this.onBlur, 200);
		});
	}
}
