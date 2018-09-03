import { TdCoreDirective } from './../../main/core/body/td-core.directive';
import { Component, OnInit } from '@angular/core';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-autocomplete-editor',
	templateUrl: './autocomplete-editor.component.html',
	providers: [PluginService]
})
export class AutocompleteEditorComponent {
	filteredOptions: any[] = [];

	context: { $implicit: AutocompleteEditorComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private view: ViewCoreService
	) {
	}

	filter(val: any) {
		// For now works only with type 'string' and 'number'

		if (val === '') {
			this.filteredOptions = [];
		} else {
			this.filteredOptions = this.options.filter(option => option.toString().toLowerCase().includes(val.toLowerCase()));
		}
	}

	get options() {
		return this.cell.fetch.result;
	}

	get title() {
		return this.cell.column.title;
	}

	get value() {
		return this.cell.value;
	}

	set value(value) {
		this.cell.value = value;
	}

	private get cell() {
		return this.view.edit.cell;
	}
}
