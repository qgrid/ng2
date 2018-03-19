import {
	Input,
	Component,
	Optional,
	OnInit,
	EventEmitter,
	Output,
	OnDestroy
} from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { ColumnFilterView } from 'ng2-qgrid/plugin/column-filter/column.filter.view';
import { uniq, flatten } from 'ng2-qgrid/core/utility';

@Component({
	selector: 'q-grid-column-filter',
	templateUrl: './column-filter.component.html'
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

		const columnFilter =
			this.columnFilter =
			new ColumnFilterView(model, context);

		this.using(this.columnFilter.submitEvent.on(() => this.submitEvent.emit()));
		this.using(this.columnFilter.cancelEvent.on(() => this.cancelEvent.emit()));

		this.context = { $implicit: this.columnFilter };

		const isBlank = model.filter().assertFactory().isNull;
		if (!columnFilter.items.length) {
			const source = model[model.columnFilter().source];
			let items = source().rows.map(columnFilter.getValue);
			if (columnFilter.column.type === 'array') {
				items = flatten(items);
			}

			const uniqItems = uniq(items);
			const notBlankItems = uniqItems.filter(x => !isBlank(x));
			const filteredItems = notBlankItems;

			filteredItems.sort(columnFilter.column.compare);
			columnFilter.items = filteredItems;
			columnFilter.hasBlanks =
				notBlankItems.length !== uniqItems.length &&
				(!columnFilter.filter || 'blanks'.indexOf(columnFilter.filter.toLowerCase()) >= 0);
		}
	}

	ngOnDestroy() {
		this.columnFilter.dispose();
	}
}
