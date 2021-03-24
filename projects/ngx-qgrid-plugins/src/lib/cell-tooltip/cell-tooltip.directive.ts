import {
	OnChanges,
	Input,
	Directive,
	ElementRef,
	SimpleChanges,
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
	constructor(private elementRef: ElementRef) {
		this.elementRef.nativeElement.style.display = 'none';
	}

	ngOnChanges(e: SimpleChanges) {
		if (e.showDelay) {
			this.job = jobLine(this.showDelay);
		}

		if (e.host && this.host) {
			const { top, left, height } = this.host.getBoundingClientRect();
			const box = this.getBoxRect(this.host);
			const targetElement = this.elementRef.nativeElement;
			this.job(() => {
				targetElement.style.top = top - box.top + height + 'px';
				targetElement.style.left = left - box.left + 'px';
				targetElement.style.display = 'block';
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
