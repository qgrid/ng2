import {
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Input,
	ElementRef
} from '@angular/core';
import { DomTd, GridPlugin, TemplateHostService } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-cell-tooltip',
	templateUrl: './cell-tooltip.component.html',
	providers: [GridPlugin, TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellTooltipComponent implements OnInit {
	@Input('showDelay') showDelay: number;

	context: { $implicit: DomTd } = {
		$implicit: null,
	};

	constructor(private elementRef: ElementRef, private plugin: GridPlugin, private cd: ChangeDetectorRef) {
		console.log(this.showDelay);
	}

	ngOnInit() {
		const { model, observeReply, table } = this.plugin;
		observeReply(model.highlightChanged).subscribe((e) => {
			if (e.hasChanges('cell') && e.state.cell) {
				const domCell = table.body.cell(
					e.state.cell.rowIndex,
					e.state.cell.columnIndex
				);
				if (domCell) {
					this.context = { $implicit: domCell.model() };
					this.addTooltipLayer();
				}
			}
		});
	}

	private addTooltipLayer(): void {
		const tooltipLayer = 'tooltip';
		const table = this.plugin.table;
		if (table.view.hasLayer(tooltipLayer)) {
			table.view.removeLayer(tooltipLayer);
		}

		table.view.addLayer(tooltipLayer);
		this.invalidate();
	}

	private invalidate(): void {
		this.cd.markForCheck();
		this.cd.detectChanges();
	}
	OnCreated(st: any): void {
		console.log('works');
	}

	get delay() {
		return this.showDelay;
	}
}
