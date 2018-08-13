import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgComponent } from '../../infrastructure/component/ng.component';
import { CellView } from 'ng2-qgrid/core/scene/view/cell.view';
import { Command } from 'ng2-qgrid/core/command/command';
import { getFactory as valueFactory } from 'ng2-qgrid/core/services/value';
import { isArray, isUndefined } from 'ng2-qgrid/core/utility/kit';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { SelectionService } from 'ng2-qgrid/core/selection/selection.service';
import { ReferenceEditorComponent } from './reference-editor.component';

@Component({
	selector: 'q-grid-reference',
	templateUrl: './reference.component.html'
})
export class ReferenceComponent extends NgComponent implements OnInit {
	private _value: any;
	private _model: Model;
	private _reference: {
		commit: Command,
		cancel: Command,
		value: any
	};

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
	@Output() modelChange = new EventEmitter<Model>();
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

	constructor() {
		super();
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
			getValue: valueFactory(this.cell.column)
		});

		const selectionService = new SelectionService(this.model);
		this.using(this.model.dataChanged.watch((e, off) => {
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
		}));

		this.using(this.model.selectionChanged.watch(e => {
			if (e.tag.source === 'reference.component') {
				return;
			}

			if (e.hasChanges('items')) {
				const entries = selectionService.lookup(e.state.items);
				this.value = entries;
			}
		}));
	}
}
