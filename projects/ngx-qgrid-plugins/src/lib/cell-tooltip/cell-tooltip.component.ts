import { ChangeDetectionStrategy, Component, ViewEncapsulation, AfterContentChecked, Input } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-cell-tooltip',
	templateUrl: './cell-tooltip.component.html',
	styles: [`#q-grid-cell-tooltip {
		color: #fff;
		border-radius: 4px;
		background: rgba(97,97,97,.9);
		margin: 14px;
		padding-left: 8px;
		padding-right: 8px;
		padding-top: 6px;
		padding-bottom: 6px;
		overflow: hidden;
		text-overflow: ellipsis;
		width: fit-content;
		max-width: 100%;
		max-height: 100%;
	}`],
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellTooltipComponent implements AfterContentChecked {
	@Input('showDelay') showDelay: number;
	constructor(private plugin: GridPlugin) {}

	ngAfterContentChecked() {
		const { model, observe, table } = this.plugin;
		observe(model.highlightChanged)
			.subscribe(e => {
				if (e.hasChanges('cell') && e.state.cell) {
					const domCell = table.body.cell(e.state.cell.rowIndex, e.state.cell.columnIndex);
					if (domCell) {
						const { top, left } = domCell.element.getBoundingClientRect();
						this.addTooltipLayer();
						this.moveTooltip(top, left);
					}
				}
			});
	}

	private moveTooltip(top: number, left: number) {
		const el = document.getElementById('q-grid-cell-tooltip').parentElement;
		// temporal solution
		const offset = 260 + 15 + 16 + 6;
		el.style.setProperty('display', 'none');

		el.style.setProperty('left', (left - offset) + 'px');
		el.style.setProperty('top', top + 'px');

		setTimeout(function() {
			el.style.setProperty('display', 'block');
		}, this.showDelay );
	}

	private addTooltipLayer(): void {
		const tooltipLayer = 'tooltip';
		const table = this.plugin.table;
		if (!table.view.hasLayer(tooltipLayer)) {
			table.view.addLayer(tooltipLayer);
		}
	}
}
