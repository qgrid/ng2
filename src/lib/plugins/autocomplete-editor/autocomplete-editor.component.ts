import { TdCoreDirective } from './../../main/core/body/td-core.directive';
import { Component, OnInit, Optional } from '@angular/core';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { PluginService } from '../plugin.service';
import { predicateFactory } from 'ng2-qgrid/core/services/predicate';

@Component({
	selector: 'q-grid-autocomplete-editor',
	templateUrl: './autocomplete-editor.component.html',
	providers: [PluginService]
})
export class AutocompleteEditorComponent {
	options: any[] = [];

	context: { $implicit: AutocompleteEditorComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private view: ViewCoreService
	) {
	}

	filter(search: string) {
		if (search === '') {
			this.reset();
			return;
		}

		const { type } = this.cell.column;
		switch (type) {
			case 'number':
			case 'text':
			case 'date': {
				const result = this.findItems(search);
				if (result) {
					this.options = result;
				} else {
					this.reset();
				}
				break;
			}
			case 'bool': {
				const result = this.findItems(search);
				if (result.length && result[0] === null || !result.length && this.options.length) {
					this.reset();
				} else if (result.length) {
					this.options = [result[0]];
				}
				break;
			}
		}
	}

	findItems(value) {
		const items = this.items;
		const predict = predicateFactory(value);

		const type = this.getType(items);
		switch (type) {
			case 'array': {
				return items.filter(item => predict(item));
			}
			case 'date':
			case 'null':
			case 'undefined': {
				if (predict(items)) {
					return [items];
				}
			}
		}
	}

	reset() {
		this.options = [];
	}

	getType(type) {
		return {}.toString.call(type).slice('[object]'.length, -1).toLowerCase();
	}

	get items() {
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
