import { TdCoreDirective } from './../../main/core/body/td-core.directive';
import {
	Component,
	Optional,
	TemplateRef,
	OnInit,
	ElementRef,
	Input
} from '@angular/core';
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
	@Input() cell: TdCoreDirective;

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
		if (val === '') {
			return;
		}

		return this.options.filter(option => option.toLowerCase().includes(val.toLowerCase()));
	}

	private exit() {
		this.view.edit.cell.exit.execute(this.cell);
	}

	get options() {
		return this.view.edit.cell.fetch.result;
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
}
