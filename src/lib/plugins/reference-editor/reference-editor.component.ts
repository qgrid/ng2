import {
	Component,
	Optional,
	TemplateRef,
	OnInit,
	ElementRef
} from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from '../../infrastructure/component/root.service';
import { isString } from 'ng2-qgrid/core/utility/kit';
import { BoolColumnModel } from 'ng2-qgrid/core/column-type/bool.column';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Command } from 'ng2-qgrid/core/command/command';
import { ViewCoreService } from '../../main/core/view/view-core.service';

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
		this.referenceModel = this.column.editorOptions.modelFactory(this.editView.cell);

		this.submit = new Command({
			canExecute: () => this.editView.commit.canExecute(),
			execute: () => {
				this.editView.commit.execute();
			}
		});

		this.cancel = this.editView.cancel;
	}

	get title(): string {
		return this.editView.column.title;
	}

	get column() {
		return this.editView.column;
	}

	private get editView() {
		return this.view.edit.cell;
	}
}
