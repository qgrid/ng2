import { OnInit, Input, Component } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command';
import { uniq, clone, noop } from 'ng2-qgrid/core/utility';
import { getFactory as valueFactory } from 'ng2-qgrid/core/services/value';
import { ColumnFilterDirective } from './column-filter.directive';
import { GridService } from 'ng2-qgrid/main/grid';
import * as columnService from 'ng2-qgrid/core/column/column.service';

@Component({
	selector: 'q-grid-column-filter',
	templateUrl: './column-filter.component.html',
	providers: []
})
export class ColumnFilterComponent implements OnInit {
	@Input() public filter = '';

	public by = new Set<string>();
	public items = [];

	public context = { $implicit: this };

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

	constructor(private columnFilter: ColumnFilterDirective, private grid: GridService) {
	}

	ngOnInit() {
		const column = columnService.find(this.model.data().columns, this.key);
		this.header = column.title;

		const getValue = valueFactory(column);

		const filterBy = this.columnFilter.model.filter().by[this.key];
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

	public get items() {
		return this.columnFilter.items;
	}

	public set items(value) {
		this.columnFilter.items = value;
	}

	public get by() {
		return this.columnFilter.by;
	}

	public set by(value) {
		this.columnFilter.by = value;
	}

	private get key() {
		return this.columnFilter.key;
	}

	private get model() {
		return this.columnFilter.model;
	}
}
