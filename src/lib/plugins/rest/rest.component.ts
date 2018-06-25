import { Component, Optional, Input, OnInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestView } from 'ng2-qgrid/plugin/rest/rest.view';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-rest',
	template: '',
	providers: [PluginService]
})
export class RestComponent implements OnInit, OnChanges {
	@Input('url') restUrl: string;
	@Input('method') restMethod: string;
	@Input('serialize') restSerialize: (x: any) => any;

	context: { $implicit: RestView };

	constructor(private http: HttpClient, private plugin: PluginService) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.plugin.keep(changes, ['rest']);
	}

	ngOnInit() {
		const rest = new RestView(this.plugin.model, {
			get: (url, params) => this.http.get(url, { params }).toPromise(),
			post: (url, data) => this.http.post(url, { data }).toPromise()
		});

		this.context = { $implicit: rest };
	}
}