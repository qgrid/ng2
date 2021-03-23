import {
	OnChanges,
	Input,
	Directive,
	ElementRef,
	SimpleChanges,
} from '@angular/core';
import { GridError, GridPlugin, TemplateHostService } from '@qgrid/ngx';
import { jobLine } from '@qgrid/core/services/job.line';
@Directive({
	selector: '[q-grid-tooltip]',
	providers: [GridPlugin, TemplateHostService],
})
export class CellTooltipDirective implements OnChanges {
	@Input() showDelay = 1000;
	@Input() host: HTMLElement;
	private job = jobLine(this.showDelay);
	constructor(private elementRef: ElementRef) {
		this.elementRef.nativeElement.style.display = 'none';
	}

	ngOnChanges(e: SimpleChanges) {
		if (e.delay) {
			this.job = jobLine(this.showDelay);
		}
		if (this.host) {
			const { top, left } = this.host.getBoundingClientRect();
			// ToDo: corect with grid viewport
			const offsetX = 260 + 15 + 16;
			const offsetY = 50;
			this.job(() => {
				const targetElement = this.elementRef.nativeElement;
				targetElement.style.top = top - offsetY + 'px';
				targetElement.style.left = left - offsetX + 'px';
				targetElement.style.display = 'block';
			});
		}
	}
}
