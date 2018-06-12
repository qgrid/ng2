import {
	Component,
	Optional,
	TemplateRef,
	OnInit,
	ElementRef
} from '@angular/core';
import { isString } from 'ng2-qgrid/core/utility/kit';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { BoolColumnModel } from 'ng2-qgrid/core/column-type/bool.column';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-bool-editor',
	templateUrl: './bool-editor.component.html',
	providers: [PluginService]
})
export class BoolEditorComponent implements OnInit {
	context: { $implicit: BoolEditorComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private view: ViewCoreService,
		private element: ElementRef
	) {
	}

	ngOnInit() {
		// entering edit mode means toggling boolean value
		if (this.column.editorOptions.trigger === 'click') {
			this.value =
				this.value === this.trueValue
					? this.falseValue : this.trueValue;
		}

		this.plugin.model.focusChanged.on(e => this.cell.exit.execute());
	}

	isChecked() {
		return this.column.isChecked(this.value);
	}

	isIndeterminate() {
		return this.column.isIndeterminate(this.value);
	}

	get trueValue() {
		return this.column.trueValue;
	}

	get falseValue() {
		return this.column.falseValue;
	}

	get value() {
		return this.cell.value;
	}

	set value(value) {
		this.cell.value = value;
	}

	private get column() {
		return this.view.edit.cell.column as BoolColumnModel;
	}

	private get cell() {
		return this.view.edit.cell;
	}
}
