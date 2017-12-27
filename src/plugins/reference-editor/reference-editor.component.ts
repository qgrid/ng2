import {
	Component,
	Optional,
	TemplateRef,
	OnInit,
	ElementRef
} from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { isString } from 'ng2-qgrid/core/utility';
import { ViewCoreService } from 'ng2-qgrid/main/core/view/view-core.service';
import { BoolColumnModel } from 'ng2-qgrid/core/column-type/bool.column';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

@Component({
	selector: 'q-grid-reference-editor',
	templateUrl: './reference-editor.component.html'
})
export class ReferenceEditorComponent extends PluginComponent
	implements OnInit {
	public referenceModel: Model;

	constructor(
		@Optional() root: RootService,
		private view: ViewCoreService,
		private element: ElementRef
	) {
		super(root);
	}

	ngOnInit() {
		this.referenceModel = this.column.editorOptions.modelFactory();
	}

	get title(): string {
		return this.view.edit.cell.editor.title;
	}

	get column() {
		return this.cell.editor.column;
	}

	private get cell() {
		return this.view.edit.cell;
	}
}
