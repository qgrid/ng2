import { HttpClient } from '@angular/common/http';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { GridPlugin, StateAccessor } from '@qgrid/ngx';
import { PipeUnit } from '@qgrid/core/public-api';

@Component({
	selector: 'q-data-provider',
	template: '',
	providers: [GridPlugin, StateAccessor],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataProviderComponent implements OnInit, OnChanges {
	nextReference: (args) => void;

	@Input('data') set tempData(value) {
		if (this.nextReference) {
			this.nextReference(value);
		}
	}

	@Output() requestData = new EventEmitter<any>();

	constructor(
		private http: HttpClient,
		private plugin: GridPlugin,
		private stateAccessor: StateAccessor
	) {
	}

	ngOnChanges() {
		const { model } = this.plugin;
		this.stateAccessor.write(model);
	}

	ngOnInit() {
		this.plugin.model.data({
			pipe: [
				(data, context, next) => {
					this.nextReference = next;
					this.requestData.emit(this.plugin.model);
				},
				...PipeUnit.view
			]
		}, { source: 'rest.view' });
	}
}
