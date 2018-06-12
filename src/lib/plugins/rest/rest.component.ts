import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestView } from 'ng2-qgrid/plugin/rest/rest.view';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-rest',
	template: '',
	providers: [PluginService]
})
export class RestComponent implements OnInit {
	@Input('url') public restUrl: string;
	@Input('method') public restMethod: string;
	@Input('serialize') public restSerialize: (x: any) => any;

	context: { $implicit: RestView };

	constructor(private http: HttpClient, private plugin: PluginService) {
		this.models = ['rest'];
	}

	ngOnInit() {
		const rest = new RestView(this.plugin.model, {
			get: (url, params) => this.http.get(url, { params }).toPromise(),
			post: (url, data) => this.http.post(url, { data }).toPromise()
		});

		this.context = { $implicit: rest };
	}
}