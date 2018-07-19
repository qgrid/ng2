import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { isArray } from 'ng2-qgrid/core/utility/kit';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Command } from 'ng2-qgrid/core/command/command';
import { SelectionService } from 'ng2-qgrid/core/selection/selection.service';
import { getFactory as valueFactory } from 'ng2-qgrid/core/services/value';
import { NgComponent } from '../../infrastructure/component/ng.component';
import { CellView } from 'ng2-qgrid/core/scene/view/cell.view';

@Component({
	selector: 'q-grid-reference-editor',
	templateUrl: './reference-editor.component.html'
})
export class ReferenceEditorComponent extends NgComponent implements OnInit {
	private state: any;

	@Input() caption: string;
	@Input() cell: CellView;
	@Output() valueChange = new EventEmitter<any>();
	@Output() afterSubmit = new EventEmitter();
	@Output() afterCancel = new EventEmitter();

	context: { $implicit: ReferenceEditorComponent } = {
		$implicit: this
	};

	referenceModel: Model;
	submit: Command;
	cancel: Command;

	constructor() {
		super();
	}

	@Input() get value() {
		return this.state;
	}

	set value(value) {
		if (value !== this.state) {
			this.state = value;
			this.valueChange.emit(value);
		}
	}

	ngOnInit() {
		const commit = new Command({
			execute: e => this.value = e.entries
		});

		const cancel = new Command();
		const reference = {
			commit,
			cancel,
			value: this.value
		};

		this.referenceModel = this.cell.column.editorOptions.modelFactory({
			row: this.cell.row,
			column: this.cell.column,
			reference,
			getValue: valueFactory(this.cell.column)
		});


		const { commitShortcuts, cancelShortcuts } = this.referenceModel.edit();
		const selectionService = new SelectionService(this.referenceModel);

		this.using(this.referenceModel.dataChanged.watch((e, off) => {
			if (e.hasChanges('rows') && e.state.rows.length > 0) {
				off();

				if (!this.referenceModel.selection().items.length) {
					const { value } = reference;
					const entries = isArray(value) ? value : [value];
					const items = selectionService.map(entries);
					this.referenceModel.selection({ items });
				}
			}
		}));

		this.submit = new Command({
			shortcut: commitShortcuts.form,
			canExecute: () => {
				const { items } = this.referenceModel.selection();
				const entries = selectionService.lookup(items);
				const context = { items, entries };

				return reference.commit.canExecute(context);
			},
			execute: () => {
				const { items } = this.referenceModel.selection();
				const entries = selectionService.lookup(items);
				const context = { items, entries };
				if (reference.commit.execute(context) !== false) {
					if (reference.commit === commit) {
						this.afterSubmit.emit();
					} else {
						this.afterCancel.emit();
					}
				}

				return false;
			}
		});

		this.cancel = new Command({
			shortcut: cancelShortcuts.form || cancelShortcuts.$default,
			canExecute: () => reference.cancel.canExecute(),
			execute: () => {
				if (reference.cancel.execute() !== false) {
					this.afterCancel.emit();
				}

				return false;
			}
		});

		const { shortcut, manager } = this.referenceModel.action();
		shortcut.register(manager, [this.submit, this.cancel]);
	}
}
