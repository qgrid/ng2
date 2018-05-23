import { Component, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestView } from 'ng2-qgrid/plugin/rest/rest.view';
import { RootService } from '../../infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';

@Component({
	selector: 'q-grid-rest',
	template: ''
})
export class RestComponent extends PluginComponent
	implements OnInit, OnDestroy {
	@Input('url') public restUrl: string;
	@Input('method') public restMethod: string;
	@Input('serialize') public restSerialize: (x: any) => any;

	private rest: RestView;

	constructor(private http: HttpClient, @Optional() root: RootService) {
		super(root);

		this.models = ['rest'];
	}

	onReady() {
		this.rest = new RestView(this.model, {
			get: (url, params) => this.http.get(url, { params }).toPromise(),
			post: (url, data) => this.http.post(url, { data }).toPromise()
		});
		this.context = { $implicit: this.rest };
	}
}
