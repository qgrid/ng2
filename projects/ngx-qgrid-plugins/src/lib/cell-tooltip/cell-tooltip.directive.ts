import { EventEmitter, Output, Input, Renderer2, Directive, ElementRef, OnInit } from '@angular/core';
import { DomCell, DomTd, GridPlugin, TemplateHostService } from '@qgrid/ngx';
import { jobLine } from '@qgrid/core/services/job.line';
@Directive({
	selector: '[q-grid-tooltip]',
	providers: [GridPlugin, TemplateHostService],
})
export class CellTooltipDirective implements OnInit {
	@Input('showDelay') showDelay: DomTd;
	@Output() created: EventEmitter<any> = new EventEmitter();
	context: { $implicit: DomTd } = {
		$implicit: null,
	};

	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer2,
		private plugin: GridPlugin
	) {
		elementRef.nativeElement.style.backgroundColor = 'yellow';
		console.log(this.showDelay);
		this.created.emit(null);
	}

	ngOnInit() {
		const { model, observe, table } = this.plugin;
		observe(model.highlightChanged).subscribe((e) => {
			if (e.hasChanges('cell') && e.state.cell) {
				const domCell = table.body.cell(
					e.state.cell.rowIndex,
					e.state.cell.columnIndex
				);
				if (domCell) {
					this.context = { $implicit: domCell.model() };
					this.moveTooltip(domCell);
				}
			} else {
				this.hideTooltip();
			}
		});
	}

	private moveTooltip(cell: DomCell) {
		const delay = 800;
		const job = jobLine(delay);
		const { top, left } = cell.element.getBoundingClientRect();
		const offset = 260 + 15 + 16;
		const el = this.elementRef.nativeElement;
		this.elementRef.nativeElement.style.top = top + 'px';
		this.elementRef.nativeElement.style.left = left - offset + 'px';

		job(() => {
			el.classList.add('show');
		}).catch(() => {
			el.classList.remove('show');
		});
	}

	private hideTooltip(): void {
		const el = this.elementRef.nativeElement;
		this.renderer.setStyle(el, 'display', 'none');
	}
}
