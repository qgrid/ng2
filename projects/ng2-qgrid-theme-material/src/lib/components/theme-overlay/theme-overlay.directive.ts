import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { GridError, GridPlugin } from 'ng2-qgrid';

@Directive({
	selector: '[q-grid-theme-overlay]',
	providers: [GridPlugin]
})
export class ThemeOverlayDirective implements AfterViewInit {

	constructor(
		private plugin: GridPlugin,
		private elementRef: ElementRef,
		private renderer: Renderer2) {
	}

	ngAfterViewInit(): void {
		const { model } = this.plugin;
		const element = this.elementRef.nativeElement;
		let parent = this.renderer.parentNode(element);
		let overlayContainer: any = null;

		while (parent && !(parent.id && parent.id.startsWith('cdk-overlay'))) {
			parent = this.renderer.parentNode(parent);
			if (parent.nodeName === 'BODY') {
				break;
			}
		}

		if (parent.nodeName !== 'BODY') {
			overlayContainer = parent;
		}

		if (!overlayContainer) {
			throw new GridError(
				'theme-overlay.directive',
				`cdk-overlay container is not found`
			);
		}

		model.style().classList.forEach(cssClass => {
			this.renderer.addClass(overlayContainer, cssClass);
		});
	}
}
