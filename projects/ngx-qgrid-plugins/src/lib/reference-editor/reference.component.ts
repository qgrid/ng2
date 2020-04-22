import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { CellView } from '@qgrid/core/scene/view/cell.view';
import { Command } from '@qgrid/core/command/command';
import { getFactory } from '@qgrid/core/services/value';
import { isArray, isUndefined } from '@qgrid/core/utility/kit';
import { SelectionService } from '@qgrid/core/selection/selection.service';
import { GridModel, Disposable, GridModelBuilder } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-reference',
	templateUrl: './reference.component.html',
	providers: [Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferenceComponent implements OnInit {
	private _value: any;
	private _model: GridModel;
	private _reference: {
		commit: Command,
		cancel: Command,
		value: any
	};

	@Input() caption: string;
	@Input() autofocus = false;
	@Input() cell: CellView;

	get value() { return this._value; }
	@Output() valueChange = new EventEmitter<any>();
	@Input() set value(value) {
		if (value !== this._value) {
			this._value = value;
			this.valueChange.emit(value);
		}
	}

	get model() { return this._model; }
	@Output() modelChange = new EventEmitter<GridModel>();
	@Input() set model(value) {
		if (value !== this._model) {
			this._model = value;
			this.modelChange.emit(value);
		}
	}

	get reference() { return this._reference; }
	@Output() referenceChange = new EventEmitter<{ commit: Command, cancel: Command, value: any }>();
	@Input() set reference(value) {
		if (value !== this._reference) {
			this._reference = value;
			this.referenceChange.emit(value);
		}
	}

	context: { $implicit: ReferenceComponent } = {
		$implicit: this
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
			getValue: getFactory(this.cell.column),
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
							this.model.selection({ items }, { source: 'reference.component' });
						}
					}
				}
			})
		);

		this.disposable.add(
			this.model.selectionChanged.watch(e => {
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
