import { TdCoreDirective } from './../../main/core/body/td-core.directive';
import { Component, OnInit, Optional } from '@angular/core';
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
		const columnType = this.cell.column.type;

		if (val === '') {
			this.filteredOptions = [];
			return;
		}

		switch (columnType) {
			case 'number':
			case 'text': {
				this.filteredOptions = this.options.filter(option => String(option).toLowerCase().includes(val.toLowerCase()));
				break;
			}
			case 'bool': {
				const result = this.options.filter(option => String(option).toLowerCase().includes(val.toLowerCase()));
				if (result.length && result[0] === null) {
					this.filteredOptions = ['null'];
				} else if (result.length) {
					this.filteredOptions = [result[0].toString()];
				} else if (this.filteredOptions.length) {
					this.filteredOptions = [];
				}
				break;
			}
			case 'date': {

			}
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
