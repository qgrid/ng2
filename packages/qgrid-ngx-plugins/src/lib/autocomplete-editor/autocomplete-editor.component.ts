import { ChangeDetectionStrategy, Component } from '@angular/core';
import { isArray, predicateFactory } from '@qgrid/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-autocomplete-editor',
	templateUrl: './autocomplete-editor.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteEditorComponent {
	private get cell() {
		return this.plugin.view.edit.cell;
	}

	options: any[] = [];

	context: { $implicit: AutoCompleteEditorComponent } = {
		$implicit: this
	};

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

	itemLabelFactory(column) {
		const { itemLabel } = column;
		if (itemLabel) {
			return (item) => itemLabel(item);
		}

		return item => item;
	}
}
