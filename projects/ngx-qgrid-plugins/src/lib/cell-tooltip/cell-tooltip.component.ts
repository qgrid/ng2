import {
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Input,
	ApplicationRef,
} from '@angular/core';
import { DomTd, GridPlugin, TemplateHostService } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-cell-tooltip',
	templateUrl: './cell-tooltip.component.html',
	providers: [GridPlugin, TemplateHostService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CellTooltipComponent implements OnInit {
	@Input() showDelay: number;

	context: { $implicit: DomTd } = {
		$implicit: null,
	};
	cellElement: HTMLElement;
	rowIndex: number;
	columnIndex: number;

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
		private appRef: ApplicationRef
	) {}

	ngOnInit() {
		const { model, observe, table } = this.plugin;

		observe(model.highlightChanged)
			.subscribe(e => {
				if (e.hasChanges('cell') && e.state.cell) {
					const { rowIndex, columnIndex } = e.state.cell;
					this.rowIndex = rowIndex;
					this.columnIndex = columnIndex;
					const domCell = table.body.cell(rowIndex, columnIndex);
					if (domCell.model()) {
						this.context = { $implicit: domCell.model() };
						this.cellElement = domCell.element;
						this.addTooltipLayer();
					}
				}
			});

		observe(model.mouseChanged)
			.subscribe((e) => {
				const { status, target } = model.mouse();
				if (status === 'move') {
					if (
						target === null ||
						target.columnIndex !== this.columnIndex ||
						target.rowIndex !== this.rowIndex
					) {
						this.cellElement = null;
						this.invalidate();
					}

				}

				if (status === 'leave') {
					this.cellElement = null;
					this.invalidate();
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
		// ToDo: Investigate how to improve.
		this.cd.markForCheck();
		this.cd.detectChanges();
		this.appRef.tick();
	}
}
