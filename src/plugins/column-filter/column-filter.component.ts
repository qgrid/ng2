import {
	Input,
	Component,
	Optional,
	OnInit,
	EventEmitter,
	Output,
	OnDestroy
} from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { PluginComponent } from '../plugin.component';
import { ColumnFilterView } from 'ng2-qgrid/plugin/column-filter/column.filter.view';
import {uniq, flatten} from 'ng2-qgrid/core/utility';

@Component({
	selector: 'q-grid-column-filter',
	templateUrl: './column-filter.component.html',
	providers: []
})
export class ColumnFilterComponent extends PluginComponent implements OnInit, OnDestroy {
	@Input() public key: string;
	@Output('submit') submitEvent = new EventEmitter<any>();
	@Output('cancel') cancelEvent = new EventEmitter<any>();

	private columnFilter: ColumnFilterView;

	constructor( @Optional() root: RootService) {
		super(root);
	}

	public ngOnInit() {
		const model = this.model;
		const context = {
			key: this.key
		};

		this.columnFilter = new ColumnFilterView(model, context);

		this.using(this.columnFilter.submitEvent.on(() => this.submitEvent.emit()));
		this.using(this.columnFilter.cancelEvent.on(() => this.cancelEvent.emit()));

		this.context = { $implicit: this.columnFilter };

		const source = model[model.columnFilter().source];
		let items = source().rows.map(this.columnFilter.getValue);
		if (this.columnFilter.column.type === 'array') {
			items = flatten(items);
		}

		const uniqItems = uniq(items);
		const filteredItems = uniqItems; // this.$filter('filter')(uniqItems, columnFilter.filter);
		filteredItems.sort(this.columnFilter.column.compare);
		this.columnFilter.items = filteredItems;
	}

	ngOnDestroy() {
		this.columnFilter.dispose();
	}
}
