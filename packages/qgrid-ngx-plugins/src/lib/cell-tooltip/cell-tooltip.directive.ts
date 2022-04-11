import {
	Directive,
	ElementRef, Input, OnChanges, Renderer2, SimpleChanges
} from '@angular/core';
import { GRID_PREFIX, jobLine } from '@qgrid/core';
import { GridPlugin, TemplateHostService } from '@qgrid/ngx';

@Directive({
	selector: '[q-grid-tooltip]',
	providers: [GridPlugin, TemplateHostService],
})

//TODO: Re-name to TooltipDirective
export class CellTooltipDirective implements OnChanges {
	@Input() host: HTMLElement;
	@Input() showDelay = 1000;
	@Input() position: (host: HTMLElement) => [number, number] = (host) => {
		const { top, left, height } = host.getBoundingClientRect();
		const box = this.getBoxRect(host);

		return [left - box.left, top - box.top + height];
	};

	private job = jobLine(this.showDelay);

	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer2
	) {
	}

	ngOnChanges(e: SimpleChanges) {
		if (e.showDelay) {
			this.job = jobLine(this.showDelay);
		}

		if (e.host && this.host) {
			const nativeElement = this.elementRef.nativeElement;
			this.job(() => {
				const [left, top] = this.position(this.host);
				this.renderer.setStyle(nativeElement, 'top', top + 'px');
				this.renderer.setStyle(nativeElement, 'left', left + 'px');
				this.renderer.removeClass(nativeElement, 'q-grid-hide');
			});

		}

	}

	// TODO: Extract to external function
	private getBoxRect(element: HTMLElement) {
		let view = element;
		const marker = `${GRID_PREFIX}-box`;
		while (view) {
			if (view.classList && view.classList.contains(marker)) {
				return view.getBoundingClientRect();
			}

			view = view.parentNode as HTMLElement;
		}

		return view.getBoundingClientRect();
	}
}
