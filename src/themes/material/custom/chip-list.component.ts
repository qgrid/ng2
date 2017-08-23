import {Component, Input, OnInit} from '@angular/core';
import {AppError} from '@grid/core/infrastructure';

interface IChipValue {
	value: any;
	index: number;
}

@Component({
	selector: 'q-grid-chips',
	templateUrl: './chip-list.template.html'
})
export class ChipListComponent implements OnInit {
	constructor() {
		this._editMode = false;
	}

	@Input() cell: any;

	get chipList(): any[] {
		return this._values.map((item) => item.value);
	}
	set chipList(values: any[]){
		this._values = values.map((itemValue, itemIndex) => {
			return <IChipValue> {
				value: itemValue,
				index: itemIndex
			};
		});
	};

	@Input('max-lenth') maxLength: number;

	private _values: IChipValue[];

	private newValue: any;
	private _editMode: boolean;
	private editIndex: number = -1;
	private editValue: any;

	private editMode(index: number) {
		return this._editMode && this.editIndex === index;
	}

	private removeItem(index: number) {
		this.cell.value.splice(index, 1);
		this._values.splice(index, 1);
	}
	private edit(index: number) {
		if (index < 0) {
			throw new AppError('chip-list.component', 'Index must be non-negative number');
		}

		this.editValue = this.cell.value[index];
		this.editIndex = index;
		this._editMode = true;
	}

	private endEdit() {
		if (!this.editValue) {
			throw new AppError('chip-list.component', 'Value must not be empty');
		}

		this.cell.value[this.editIndex] = this.editValue;

		this._values[this.editIndex].value = this.editValue;
		this.editIndex = -1;
		this._editMode = false;
	}

	private addItem() {
		if (this.newValue && !this.findItem(this.newValue)) {

			this.cell.value.push(this.newValue);

			this._values.push({
				value: this.newValue,
				index: this._values.length
			});
			this.newValue = '';
		}
	}

	private findItem(item: any) {
		let found = false;

		this.cell.value.forEach((value) => {
			if (value === item) {
				found = true;
			}
		});
		return found;
	}

	ngOnInit() {
		this.chipList = this.cell.value;
	}
}
