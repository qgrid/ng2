import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CellView, Command, getValueFactory, isArray, isUndefined, SelectionService } from '@qgrid/core';
import { Disposable, GridModel, GridModelBuilder } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-reference',
	templateUrl: './reference.component.html',
	providers: [Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferenceComponent implements OnInit {
	@Output() modelChange = new EventEmitter<GridModel>();
	@Output() valueChange = new EventEmitter<any>();
	@Output() referenceChange = new EventEmitter<{ commit: Command; cancel: Command; value: any }>();

	@Input() caption = '';
	@Input() autofocus = false;
	@Input() cell: CellView;

	context: { $implicit: ReferenceComponent } = {
		$implicit: this
	};

	get value() { return this._value; }
	@Input() set value(value) {
		if (value !== this._value) {
			this._value = value;
			this.valueChange.emit(value);
		}
	}

	get model() { return this._model; }
	@Input() set model(value) {
		if (value !== this._model) {
			this._model = value;
			this.modelChange.emit(value);
		}
	}

	get reference() { return this._reference; }
	@Input() set reference(value) {
		if (value !== this._reference) {
			this._reference = value;
			this.referenceChange.emit(value);
		}
	}

	private _value: any;
	private _model: GridModel;
	private _reference: {
		commit: Command;
		cancel: Command;
		value: any;
	};

	constructor(
		private modelBuilder: GridModelBuilder,
		private disposable: Disposable
	) {
	}

	ngOnInit() {
		this.reference = {
			commit: new Command({ execute: e => this.value = e.entries }),
			cancel: new Command(),
			value: this.value
		};

		this.model = this.cell.column.editorOptions.modelFactory({
			reference: this.reference,
			row: this.cell.row,
			column: this.cell.column,
			getValue: getValueFactory(this.cell.column),
			createDefaultModel: () => this.modelBuilder.build(),
		} as any);

		const selectionService = new SelectionService(this.model);
		this.disposable.add(
			this.model.dataChanged.watch((e, off) => {
				if (e.hasChanges('rows') && e.state.rows.length > 0) {
					off();

					if (!this.model.selection().items.length) {
						const { value } = this.reference;
						if (!isUndefined(value)) {
							const entries = isArray(value) ? value : [value];
							const items = selectionService.map(entries);
							this.model.selection({
								items
							}, {
								source: 'reference.component'
							});
						}
					}
				}
			})
		);

		this.disposable.add(
			this.model
				.selectionChanged
				// TODO: use rx syntax
				.watch(e => {
					// TODO: get rid of this check
					if (e.tag.source === 'reference.component') {
						return;
					}

					if (e.hasChanges('items')) {
						const entries = selectionService.lookup(e.state.items);
						this.value = entries;
					}
				})
		);
	}
}
