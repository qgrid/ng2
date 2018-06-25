import { Component, OnInit } from '@angular/core';
import { isArray } from 'ng2-qgrid/core/utility/kit';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Command } from 'ng2-qgrid/core/command/command';
import { SelectionService } from 'ng2-qgrid/core/selection/selection.service';
import { getFactory as valueFactory } from 'ng2-qgrid/core/services/value';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { NgComponent } from '../../infrastructure/component/ng.component';

@Component({
	selector: 'q-grid-reference-editor',
	templateUrl: './reference-editor.component.html'
})
export class ReferenceEditorComponent extends NgComponent implements OnInit {
	context: { $implicit: ReferenceEditorComponent } = {
		$implicit: this
	};

	referenceModel: Model;

	submit: Command;
	cancel: Command;

	constructor(
		private view: ViewCoreService
	) {
		super();
	}

	ngOnInit() {
		const commit = new Command({
			execute: e => this.edit.value = e.entries
		});

		const cancel = new Command()
		const reference = {
			commit,
			cancel,
			value: this.edit.value
		};

		this.referenceModel = this.column.editorOptions.modelFactory({
			row: this.edit.row,
			column: this.edit.column,
			reference,
			getValue: valueFactory(this.edit.column)
		});

		const selectionService = new SelectionService(this.referenceModel)

		this.using(this.referenceModel.dataChanged.watch((e, off) => {
			if (e.hasChanges('rows') && e.state.rows.length > 0) {
				off();

				if (!this.referenceModel.selection().items.length) {
					const value = reference.value;
					const entries = isArray(value) ? value : [value];
					const items = selectionService.map(entries);
					this.referenceModel.selection({ items });
				}
			}
		}));

		this.submit = new Command({
			canExecute: () => {
				const { items } = this.referenceModel.selection();
				let entries = selectionService.lookup(items);
				const context = { items, entries };

				return this.edit.commit.canExecute() && reference.commit.canExecute(context)
			},
			execute: () => {
				const { items } = this.referenceModel.selection();
				let entries = selectionService.lookup(items);
				const context = { items, entries };
				if (reference.commit.execute(context) !== false) {
					if (reference.commit === commit) {
						this.edit.commit.execute();
					} else {
						this.edit.cancel.execute();
					}
				}
			}
		});

		this.cancel = new Command({
			canExecute: () => this.edit.cancel.canExecute() && reference.cancel.canExecute(),
			execute: () => {
				if (reference.cancel.execute() !== false) {
					this.edit.cancel.execute();
				}
			}
		});
	}

	get title(): string {
		return this.edit.column.title;
	}

	get column(): ColumnModel{
		return this.edit.column;
	}

	private get edit() {
		return this.view.edit.cell;
	}
}
