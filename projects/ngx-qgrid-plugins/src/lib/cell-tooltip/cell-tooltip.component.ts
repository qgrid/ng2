import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit, Input, TemplateRef, ContentChild} from '@angular/core';
import { GridPlugin, TemplateHostService } from '@qgrid/ngx';

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
	providers: [
		GridPlugin,
		TemplateHostService
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellTooltipComponent implements OnInit {
	@ContentChild('tooltip') tooltip: TemplateRef<any>;	@Input('showDelay') showDelay: number;
	context: { $implicit: CellTooltipComponent } = {
		$implicit: this
	};
	get text() {
		return this.textContext ?? '';
	}

	private textContext: String = '';
	// ???
	private getDomElement = () => document.getElementById('q-grid-cell-tooltip').parentElement;

	constructor(private plugin: GridPlugin,
		private cd: ChangeDetectorRef) {
		}

	ngOnInit() {
		const { model, observe, table } = this.plugin;
		observe(model.highlightChanged)
			.subscribe(e => {
				if (e.hasChanges('cell') && e.state.cell) {
					const domCell = table.body.cell(e.state.cell.rowIndex, e.state.cell.columnIndex);
					if (domCell) {
						this.textContext = domCell.element.textContent;
						this.addTooltipLayer();
						this.moveTooltip(domCell);
					}
				} else {
					this.hideTooltip();
				}
			});
	}

	private moveTooltip(cell) {
		const { top, left } = cell.element.getBoundingClientRect();
		const offset = 260 + 15 + 16;
		const el = this.getDomElement();
		el.style.setProperty('display', 'none');
		el.style.setProperty('left', (left - offset) + 'px');
		el.style.setProperty('top', top + 'px');

		setTimeout(function() {
			el.style.setProperty('display', 'block');
		}, this.showDelay );
	}

	private hideTooltip(): void {
		const el = this.getDomElement();
		el.style.setProperty('display', 'none');
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
}
