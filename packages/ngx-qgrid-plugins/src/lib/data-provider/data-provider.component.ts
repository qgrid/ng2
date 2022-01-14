import { HttpClient } from '@angular/common/http';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';
import { PipeUnit } from '@qgrid/core/public-api';

@Component({
	selector: 'q-data-provider',
	template: '',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataProviderComponent implements OnInit {
	next: (data: any[]) => void;

	@Input('data') set data(value: any[]) {
		if (Array.isArray(value)) {
			const next = this.next;
			if (next) {
				this.next = null;
				next(value);
			}
		}
	}

	@Output() requestData = new EventEmitter<any>();

	constructor(
		private http: HttpClient,
		private plugin: GridPlugin
	) {
	}

	ngOnInit() {
		this.plugin.model.data({
			pipe: [
				(data, context, next) => {
					this.next = next;
					this.requestData.emit(this.plugin.model);
				},
				...PipeUnit.view
			]
		}, { source: 'data.provider' });
	}
}
