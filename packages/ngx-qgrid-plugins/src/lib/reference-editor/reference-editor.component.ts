import { Component, Input, EventEmitter, Output, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Command } from '@qgrid/core/command/command';
import { SelectionService } from '@qgrid/core/selection/selection.service';
import { CellView } from '@qgrid/core/scene/view/cell.view';
import { GridModel, Disposable } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-reference-editor',
	templateUrl: './reference-editor.component.html',
	providers: [Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferenceEditorComponent implements AfterViewInit {
	private state: any;

	@Input() caption = '';
	@Input() cell: CellView;

	@Output() valueChange = new EventEmitter<any>();
	@Output() afterSubmit = new EventEmitter();
	@Output() afterCancel = new EventEmitter();

	reference: { commit: Command, cancel: Command };
	model: GridModel;

	context: { $implicit: ReferenceEditorComponent } = {
		$implicit: this
	};

	submit = new Command();
	cancel = new Command();

	constructor(private disposable: Disposable) { }

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
			this.disposable.add(
				shortcut.register(manager, [this.submit, this.cancel])
			);
		}, 0);
	}
}
