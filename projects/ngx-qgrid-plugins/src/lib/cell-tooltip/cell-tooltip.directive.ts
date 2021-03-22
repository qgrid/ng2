import { OnChanges, Input, Directive, ElementRef } from '@angular/core';
import { GridError, GridPlugin, TemplateHostService } from '@qgrid/ngx';
import { jobLine } from '@qgrid/core/services/job.line';
@Directive({
	selector: '[q-grid-tooltip]',
	providers: [GridPlugin, TemplateHostService],
})
export class CellTooltipDirective implements OnChanges {
	@Input('showDelay') showDelay: number;
	@Input('source') source: HTMLElement;

	constructor(private elementRef: ElementRef) {}

	ngOnChanges() {
		const job = jobLine(this.showDelay);
		if (this.source) {
			const { top, left } = this.source?.getBoundingClientRect();
			const offsetX = 260 + 15 + 16;
			const offsetY = 50;
			job(() => {
				const targetElement = this.elementRef.nativeElement;
				if (!targetElement) {
					throw new GridError('tooltip', `Element is not found`);
				}
				targetElement.style.top = top - offsetY + 'px';
				targetElement.style.left = left - offsetX + 'px';
				targetElement.style.display = 'block';
			});
		}
	}
}
