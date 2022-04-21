import { HttpClient } from '@angular/common/http';
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
	OnInit,
} from '@angular/core';
import { RestState } from '@qgrid/core';
import { GridPlugin, StateAccessor } from '@qgrid/ngx';
import { RestPlugin } from '@qgrid/plugins';

@Component({
	selector: 'q-grid-rest',
	template: '',
	providers: [GridPlugin, StateAccessor],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestComponent implements OnInit, OnChanges {
	private restState = this.stateAccessor.setter(RestState);

	context: { $implicit: RestPlugin };

	@Input('url') set restUrl(url: string) { this.restState({ url }); }
	@Input('method') set restMethod(method: string) { this.restState({ method }); }
	@Input('serialize') set restSerialize(serialize: (x: any) => any) { this.restState({ serialize }); }

	constructor(
		private http: HttpClient,
		private plugin: GridPlugin,
		private stateAccessor: StateAccessor,
	) {
	}

	ngOnChanges() {
		const { model } = this.plugin;
		this.stateAccessor.write(model);
	}

	ngOnInit() {
		const rest = new RestPlugin(
			this.plugin.model, {
				get: (url, params) => this.http.get(url, { params }).toPromise(),
				post: (url, data) => this.http.post(url, { data }).toPromise(),
			});

		this.context = { $implicit: rest };
	}
}
