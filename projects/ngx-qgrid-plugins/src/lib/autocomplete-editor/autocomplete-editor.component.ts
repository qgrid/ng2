import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';
import { predicateFactory } from '@qgrid/core/services/predicate';
import { isArray } from '@qgrid/core/utility/kit';

@Component({
	selector: 'q-grid-autocomplete-editor',
	templateUrl: './autocomplete-editor.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteEditorComponent {
	options: any[] = [];

	context: { $implicit: AutoCompleteEditorComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
	) {
	}

	filter(search: string) {
		const test = predicateFactory(search);
		const getLabel = this.itemLabelFactory(this.cell.column);
		if (isArray(this.items)) {
			this.options = this.items.filter(item => test(getLabel(item)));
		}
	}

	reset() {
		this.options = [];
	}

	get items() {
		return (this.cell.fetch as any).result;
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

	itemLabelFactory(column) {
		const { itemLabel } = column;
		if (itemLabel) {
			return (item) => {
				return itemLabel(item);
			};
		}

		return item => item;
	}

	private get cell() {
		return this.plugin.view.edit.cell;
	}
}
