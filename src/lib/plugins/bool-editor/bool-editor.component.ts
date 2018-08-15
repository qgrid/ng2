import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { BoolColumnModel } from 'ng2-qgrid/core/column-type/bool.column';

@Component({
	selector: 'q-grid-bool-editor',
	templateUrl: './bool-editor.component.html'
})
export class BoolEditorComponent implements OnInit {
	private state: any;

	@Input() autofocus = false;
	@Input() column: BoolColumnModel;
	@Input() label: string;
	@Output() valueChange = new EventEmitter<any>();

	context: { $implicit: BoolEditorComponent } = {
		$implicit: this
	};

	constructor() {
	}

	@Input() get value() {
		return this.state;
	}

	set value(value) {
		if (value !== this.value) {
			this.state = value;
			this.valueChange.emit(value);
		}
	}

	ngOnInit() {
		// entering edit mode means toggling boolean value
		if (this.autofocus && this.column.editorOptions.trigger === 'click') {
			Promise.resolve(null).then(() =>
				this.value =
				this.value === this.trueValue
					? this.falseValue
					: this.trueValue
			);
		}
	}

	get isChecked() {
		return this.column.isChecked(this.value);
	}

	set isChecked(value: boolean) {
		this.value = value ? this.trueValue : this.falseValue;
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
}
