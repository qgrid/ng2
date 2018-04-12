import { Component, Optional, Output, EventEmitter, OnInit } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { Node } from '../expression-builder/model/node';
import { Command } from 'ng2-qgrid/core/command/command';

@Component({
	selector: 'q-grid-query-builder',
	templateUrl: './query-builder.component.html'
})
export class QueryBuilderComponent extends PluginComponent implements OnInit {
	public node: Node;
	@Output() close = new EventEmitter<any>();

	submit = new Command({
		source: 'query-builder.component',
		execute: () => {

		}
	});

	cancel = new Command({
		source: 'query-builder.component',
		execute: () => {

		}
	});

	reset = new Command({
		source: 'query-builder.component',
		execute: () => {
		}
	});

	constructor(@Optional() root: RootService) {
		super(root);
	}

	ngOnInit() {
		super.ngOnInit();
	}
}
