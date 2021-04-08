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

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
		private appRef: ApplicationRef
	) { }

	ngOnInit() {
		const { model, observe, table } = this.plugin;

		observe(model.mouseChanged)
			.subscribe((e) => {
				const { target } = model.mouse();
				if (e.hasChanges('target')) {
					if (target) {
						const { rowIndex, columnIndex } = target;
						const domCell = table.body.cell(rowIndex, columnIndex);
						if (domCell.model()) {
							this.context = { $implicit: domCell.model() };
							this.cellElement = domCell.element;
							this.addTooltipLayer();
						}
					} else {
						this.cellElement = null;
					}
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
	}

	private invalidate(): void {
		// ToDo: Investigate how to improve.
		this.cd.markForCheck();
		this.cd.detectChanges();
		this.appRef.tick();
	}
}
