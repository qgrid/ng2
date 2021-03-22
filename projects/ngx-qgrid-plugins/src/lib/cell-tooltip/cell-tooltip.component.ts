import {
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	Component,
	OnChanges,
	Input,
} from '@angular/core';
import { DomTd, GridPlugin, TemplateHostService } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-cell-tooltip',
	templateUrl: './cell-tooltip.component.html',
	providers: [GridPlugin, TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellTooltipComponent implements OnChanges {
	@Input('showDelay') showDelay: number;
	private cell: HTMLElement;
	context: { $implicit: DomTd } = {
		$implicit: null,
	};

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef
	) {}

	ngOnChanges() {
		const { model, observe, table } = this.plugin;
		observe(model.highlightChanged).subscribe((e) => {
			if (e.hasChanges('cell') && e.state.cell) {
				const domCell = table.body.cell(
					e.state.cell.rowIndex,
					e.state.cell.columnIndex
				);
				if (domCell) {
					this.context = { $implicit: domCell.model() };
					this.addTooltipLayer();
					this.cell = domCell.element;
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

	get delay() {
		return this.showDelay;
	}

	get source() {
		return this.cell;
	}
}
