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

@Component({
	selector: 'q-grid-bool-editor',
	templateUrl: './bool-editor.component.html'
})
export class BoolEditorComponent extends PluginComponent implements OnInit {
	constructor(
		@Optional() root: RootService,
		private view: ViewCoreService,
		private element: ElementRef
	) {
		super(root);
	}

	ngOnInit() {
		// entering edit mode means toggling boolean value
		this.value =
			this.value === this.trueValue ? this.falseValue : this.trueValue;
	}

	isChecked() {
		return this.column.isChecked(this.value);
	}

	isIndeterminate() {
		return this.column.isIndeterminate(this.value);
	}

	trueValue() {
		const value = this.column.trueValue;
		if (isString(value)) {
			return `'${value}'`;
		}

		return value;
	}

	falseValue() {
		const value = this.column.falseValue;
		if (isString(value)) {
			return `'${value}'`;
		}

		return value;
	}

	get value() {
		return this.cell.value;
	}

	set value(value) {
		this.cell.value = value;
	}

	private get column() {
		return this.view.edit.cell.editor.column as BoolColumnModel;
	}

	private get cell() {
		return this.view.edit.cell;
	}
}
