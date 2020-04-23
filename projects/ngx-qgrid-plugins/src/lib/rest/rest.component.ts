import { Component, Input, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestPlugin } from '@qgrid/plugins/rest/rest.plugin';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-rest',
	template: '',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestComponent implements OnInit, OnChanges {
	@Input('url') restUrl: string;
	@Input('method') restMethod: string;
	@Input('serialize') restSerialize: (x: any) => any;

	context: { $implicit: RestPlugin };

	constructor(private http: HttpClient, private plugin: GridPlugin) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['rest']);
	}

	ngOnInit() {
		const rest = new RestPlugin(
			this.plugin.model, {
			get: (url, params) => this.http.get(url, { params }).toPromise(),
			post: (url, data) => this.http.post(url, { data }).toPromise()
		});

		this.context = { $implicit: rest };
	}
}
