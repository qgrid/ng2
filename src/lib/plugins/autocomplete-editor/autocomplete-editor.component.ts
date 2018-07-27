import { TdCoreDirective } from './../../main/core/body/td-core.directive';
import { Component, OnInit } from '@angular/core';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { PluginService } from '../plugin.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'q-grid-autocomplete-editor',
	templateUrl: './autocomplete-editor.component.html',
	providers: [PluginService]
})
export class AutocompleteEditorComponent implements OnInit {
	control: FormControl = new FormControl();
	filteredOptions: Observable<string[]>;

	context: { $implicit: AutocompleteEditorComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private view: ViewCoreService
	) {
	}

	ngOnInit() {
		this.filteredOptions = this.control.valueChanges
			.pipe(
				map(val => this.filter(val))
			);
	}

	filter(val: any): any[] {
		// For now works only with type 'string' and 'number'

		if (val === '') {
			return;
		}

		return this.options.filter(option => option.toString().toLowerCase().includes(val.toLowerCase()));
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
