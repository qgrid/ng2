import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { ColumnModel, GRID_PREFIX } from '@qgrid/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-column-filter-trigger',
	templateUrl: './column-filter-trigger.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnFilterTriggerComponent implements OnInit {
	@Input() column!: ColumnModel;

	context: { $implicit: ColumnFilterTriggerComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
		private element: ElementRef
	) {
	}

	ngOnInit() {
		const { model, observeReply } = this.plugin;

		observeReply(model.filterChanged)
			.subscribe(e => {
				if (e.hasChanges('by')) {
					if (this.plugin.view.filter.has(this.column)) {
						this.element.nativeElement.classList.add(`${GRID_PREFIX}-active`);
					} else {
						this.element.nativeElement.classList.remove(`${GRID_PREFIX}-active`);
					}
				}
			});
	}
}
