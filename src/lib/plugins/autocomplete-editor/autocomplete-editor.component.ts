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

	filter(value: string) {
		if (value === '') {
			this.invalidate();
			return;
		}

		const columnType = this.cell.column.type;
		switch (columnType) {
			case 'number':
			case 'text':
			case 'date': {
				this.filteredOptions = this.filterOptions(value);
				break;
			}
			case 'bool': {
				const result = this.filterOptions(value);
				if (result.length && result[0] === null) {
					this.filteredOptions = ['null'];
				} else if (result.length) {
					this.filteredOptions = [result[0].toString()];
				} else if (this.filteredOptions.length) {
					this.invalidate();
				}
				break;
			}
			default: {
				break;
			}
		}
	}

	filterOptions(value) {
		const options = this.options;
		const type = this.getType(options);

		switch (type) {
			case 'array': {
				return options.filter(option => String(option).toLowerCase().includes(value.toLowerCase()));
			}
			case 'string': {
				return options.toLowerCase().includes(value.toLowerCase()) ? [options] : [];
			}
			case 'date':
			case 'null':
			case 'undefined': {
				return String(options).toLowerCase().includes(value.toLowerCase()) ? [String(options)] : [];
			}
		}
	}

	invalidate() {
		this.filteredOptions = [];
	}

	getType(type) {
		return {}.toString.call(type).slice('[object]'.length, -1).toLowerCase();
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
