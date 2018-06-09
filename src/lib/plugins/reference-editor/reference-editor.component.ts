import {
	Component,
	Optional,
	TemplateRef,
	OnInit,
	ElementRef
} from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from '../../infrastructure/component/root.service';
import { isString, isArray } from 'ng2-qgrid/core/utility/kit';
import { BoolColumnModel } from 'ng2-qgrid/core/column-type/bool.column';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Command } from 'ng2-qgrid/core/command/command';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { SelectionService } from 'ng2-qgrid/core/selection/selection.service';

@Component({
	selector: 'q-grid-reference-editor',
	templateUrl: './reference-editor.component.html'
})
export class ReferenceEditorComponent extends PluginComponent
	implements OnInit {

	referenceModel: Model;

	submit: Command;
	cancel: Command;

	constructor(
		@Optional() root: RootService,
		private view: ViewCoreService,
		private element: ElementRef
	) {
		super(root);
	}

	ngOnInit() {
		this.referenceModel = this.column.editorOptions.modelFactory(this.edit.cell);

		this.referenceModel.dataChanged.watch((e, off) => {
			if (e.hasChanges('rows') && e.state.rows.length > 0) {
				off();

				if (!this.referenceModel.selection().items.length) {
					const value = this.view.edit.cell.value;
					const items = isArray(value) ? value : [value];
					this.referenceModel.selection({ items });
				}
			}
		});

		this.submit = new Command({
			canExecute: () => this.edit.commit.canExecute(),
			execute: () => {
				const { commit } = this.edit.column.editorOptions;
				const { items } = this.referenceModel.selection();
				let entries = new SelectionService(this.referenceModel).lookup(items);
				
				const context = { items, entries };
				if (commit.canExecute({ items, entries })) {
					entries = commit.execute({ items, entries });
				}

				this.edit.value = entries;
				this.edit.commit.execute();
			}
		});

		this.cancel = this.edit.cancel;
	}

	get title(): string {
		return this.edit.column.title;
	}

	get column() {
		return this.edit.column;
	}

	private get edit() {
		return this.view.edit.cell;
	}
}
