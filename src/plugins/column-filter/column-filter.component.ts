import { Component, Optional, OnInit, Output, Input } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { Command } from 'ng2-qgrid/core/command/command';
import { clone } from 'ng2-qgrid/core/utility';

@Component({
	selector: 'q-grid-column-filter',
	templateUrl: './column-filter.component.html',
	providers: []
})
export class ColumnFilterComponent extends PluginComponent {
	@Input() public key: string;
	@Input() public header: string;

	public by = new Set<string>();
	public items = [];

	public submit = new Command({
		execute: () => {
			const filter = this.model.filter;
			const by = clone(filter().by);
			const items = Array.from(this.by);
			if (items.length) {
				by[this.key] = { items };
			} else {
				delete by[this.key];
			}

			filter({ by });
		}
	});

	public reset = new Command({
		execute: () => {
			this.by = new Set([]);
		}
	});

	constructor( @Optional() root: RootService) {
		super(root);
	}
}
