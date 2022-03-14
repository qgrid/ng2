import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PipeUnit } from '@qgrid/core/public-api';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-data-provider',
	template: '',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataProviderComponent implements OnInit {
	private next: (data: any[]) => void;

	@Input('rows') set rows(value: any[]) {
		if (Array.isArray(value)) {
			const next = this.next;
			if (next) {
				this.next = null;
				next(value);
			}
		}
	}

	@Output() requestData = new EventEmitter<any[]>();

	constructor(
		private plugin: GridPlugin
	) {
	}

	ngOnInit() {
		this.plugin.model.data({
			pipe: [
				(data, context, next) => {
					this.next = next;
					this.requestData.emit(context.model.data().rows);
				},
				...PipeUnit.view
			]
		}, { source: 'data.provider' });
	}
}
