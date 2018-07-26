import { Component, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Command } from 'ng2-qgrid/core/command/command';
import { SelectionService } from 'ng2-qgrid/core/selection/selection.service';
import { NgComponent } from '../../infrastructure/component/ng.component';
import { CellView } from 'ng2-qgrid/core/scene/view/cell.view';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

@Component({
	selector: 'q-grid-reference-editor',
	templateUrl: './reference-editor.component.html'
})
export class ReferenceEditorComponent extends NgComponent implements AfterViewInit {
	private state: any;

	@Input() caption: string;
	@Input() cell: CellView;
	@Output() valueChange = new EventEmitter<any>();
	@Output() afterSubmit = new EventEmitter();
	@Output() afterCancel = new EventEmitter();

	reference: { commit: Command, cancel: Command };
	model: Model;

	context: { $implicit: ReferenceEditorComponent } = {
		$implicit: this
	};

	submit = new Command();
	cancel = new Command();

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

	ngAfterViewInit() {
		const { model } = this;
		const { commit, cancel } = this.reference;

		const { commitShortcuts, cancelShortcuts } = model.edit();
		const selectionService = new SelectionService(model);

		// TODO: think how to get rid of this shit.
		setTimeout(() => {
			this.submit = new Command({
				shortcut: commitShortcuts.form,
				canExecute: () => {
					const { items } = model.selection();
					const entries = selectionService.lookup(items);
					const context = { items, entries };

					return commit.canExecute(context);
				},
				execute: () => {
					const { items } = model.selection();
					const entries = selectionService.lookup(items);
					const context = { items, entries };
					if (commit.execute(context) !== false) {
						this.afterSubmit.emit();
					} else {
						this.afterCancel.emit();
					}

					return false;
				}
			});

			this.cancel = new Command({
				shortcut: cancelShortcuts.form || cancelShortcuts.$default,
				canExecute: () => cancel.canExecute(),
				execute: () => {
					if (cancel.execute() !== false) {
						this.afterCancel.emit();
					}

					return false;
				}
			});

			const { shortcut, manager } = model.action();
			this.using(shortcut.register(manager, [this.submit, this.cancel]));
		}, 0);
	}
}
