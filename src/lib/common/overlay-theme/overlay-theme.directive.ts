import { Directive, ElementRef, Input, Output, EventEmitter, Renderer2, AfterViewInit } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';

@Directive({
	selector: '[q-grid-theme-overlay]'
})
export class OverlayThemeDirective  implements AfterViewInit {

	constructor(
		private root: RootService,
        private element: ElementRef, 
        private renderer: Renderer2) {
    }
    
    ngAfterViewInit(): void {
		const model = this.root.model;
		const element = this.element.nativeElement;
		let parent= this.renderer.parentNode(element);
		
		while(parent && !(parent.id && parent.id.startsWith('cdk-overlay'))){
			parent= this.renderer.parentNode(parent);
		}

		if(!parent){
			throw new AppError(
				'overlay-theme.directive',
				`cdk-overlay container is not found`
			);
		}

		model.style().classList.forEach(cssClass => {
			this.renderer.addClass(parent, cssClass);
		});
    }
}
