import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoolColumnModel } from '@qgrid/core';

@Component({
	selector: 'q-grid-bool-editor',
	templateUrl: './bool-editor.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
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
			setTimeout(() =>
				this.value =
				this.value === this.trueValue
					? this.falseValue
					: this.trueValue
				, 10);
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
