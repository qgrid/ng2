import { OnInit, Input, Component, Optional } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command';
import { uniq, clone, noop } from 'ng2-qgrid/core/utility';
import { getFactory as valueFactory } from 'ng2-qgrid/core/services/value';
import { GridService } from 'ng2-qgrid/main/grid';
import * as columnService from 'ng2-qgrid/core/column/column.service';
import { ColumnFilterDirective } from './column-filter.directive';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component';

@Component({
	selector: 'q-grid-column-filter',
	templateUrl: './column-filter.component.html',
	providers: []
})
export class ColumnFilterComponent extends PluginComponent implements OnInit {
	@Input() public filter = '';
	@Input() public header: string;
	@Input() public key: string;

	public by = new Set<string>();
	public items = [];
			
	public context = { $implicit: this };

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

	public toggle = new Command({
		execute: (item) => {
			if (this.by.has(item)) {
				this.by.delete(item);
			} else {
				this.by.add(item);
			}
		}
	});

	public toggleAll = new Command({
		execute: () => {
			const state = !this.stateAll();
			if (state) {
				for (const item of this.items) {
					this.by.add(item);
				}
			} else {
				this.by.clear();
			}
		}
	});

	constructor( @Optional() root: RootService, private grid: GridService) {
		super(root);
	}

	public ngOnInit() {
		const column = columnService.find(this.model.data().columns, this.key);
		const getValue = valueFactory(column);

		const filterBy = this.model.filter().by[this.key];
		this.by = new Set((filterBy && filterBy.items) || []);

		const model = this.model;
		const filterState = model.filter();
		const service = this.grid.service(this.model);
		if (filterState.fetch !== noop) {
			const cancelBusy = service.busy();
			filterState
				.fetch(this.key, {
					value: getValue.bind(this),
					skip: 0,
					take: Number.MAX_SAFE_INTEGER,
					filter: this.filter
				})
				.then(items => {
					this.items.push(...items);
					cancelBusy();
				})
				.catch(cancelBusy);
		} else {
			const cancelBusy = service.busy();
			try {
				if (!this.items.length) {
					const source = this.model[this.model.columnFilter().source];
					const uniqItems = uniq(source().rows.map(getValue));
					// const filteredItems = this.$filter('filter')(uniqItems, this.filter);
					// filteredItems.sort();
					// this.items = filteredItems;
					this.items = uniqItems;
				}
			} finally {
				cancelBusy();
			}
		}
	}

	public state(item) {
		return this.by.has(item);
	}

	public stateAll() {
		return this.items.every(this.state.bind(this));
	}

	public isIndeterminate() {
		return !this.stateAll() && this.items.some(this.state.bind(this));
	}
}
