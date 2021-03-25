import {
	OnChanges,
	Input,
	Directive,
	ElementRef,
	SimpleChanges,
	Renderer2
} from '@angular/core';
import { GRID_PREFIX } from '@qgrid/core/definition';
import { GridPlugin, TemplateHostService } from '@qgrid/ngx';
import { jobLine } from '@qgrid/core/services/job.line';
@Directive({
	selector: '[q-grid-tooltip]',
	providers: [GridPlugin, TemplateHostService],
})
export class CellTooltipDirective implements OnChanges {
	@Input() host: HTMLElement;
	@Input() showDelay = 1000;
	private job = jobLine(this.showDelay);

	constructor(private elementRef: ElementRef,
		private renderer: Renderer2
	) {
		renderer.addClass(elementRef.nativeElement, 'q-grid-hide');
	}

	ngOnChanges(e: SimpleChanges) {
		if (e.showDelay) {
			this.job = jobLine(this.showDelay);
		}

		if (e.host && this.host) {
			const { top, left, height } = this.host.getBoundingClientRect();
			const box = this.getBoxRect(this.host);
			const el = this.elementRef.nativeElement;
			this.job(() => {
				this.renderer.setStyle(el, 'top', top - box.top + height + 'px');
				this.renderer.setStyle(el, 'left', left - box.left + 'px');
				this.renderer.removeClass(el, 'q-grid-hide');
			});

		}

	}

	private getBoxRect(element) {
		let view = element;
		const marker = `${GRID_PREFIX}-box`;
		while (view) {
			if (view.classList && view.classList.contains(marker)) {
				return view.getBoundingClientRect();
			}

			view = view.parentNode;
		}

		return view.getBoundingClientRect();
	}
}
