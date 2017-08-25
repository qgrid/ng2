import {Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import {AppError} from '@grid/core/infrastructure';

interface IChipValue {
	value: any;
	index: number;
}
const enterKey = 13;

@Component({
	selector: 'q-grid-chips',
	templateUrl: './chip-list.tpl.html'
})
export class ChipListComponent implements OnInit  {
	constructor(private cdRef: ChangeDetectorRef) {
		this._editMode = false;
	}

	@Input('cell-value') chipValues: any[];

	private _values: IChipValue[];

	private newValue: any;
	private _editMode: boolean;
	private editIndex: number = -1;
	private editValue: any;

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

	private editMode(index: number) {
		return this._editMode && this.editIndex === index;
	}

	private removeItem(index: number) {
		this.chipValues.splice(index, 1);
		// this.chipList = this.chipValues;

		this._values = this.chipValues.map((itemValue, itemIndex) => {
			return <IChipValue> {
				value: itemValue,
				index: itemIndex
			};
		});

		this.cdRef.detectChanges();
	}
	private edit(index: number) {
		if (index < 0) {
			throw new AppError('chip-list.component', 'Index must be non-negative number');
		}

		this.editValue = this.chipValues[index];
		this.editIndex = index;
		this._editMode = true;
	}

	private endEdit() {
		if (!this.editValue) {
			throw new AppError('chip-list.component', 'Value must not be empty');
		}

		this.chipValues[this.editIndex] = this.editValue;

		this._values[this.editIndex].value = this.editValue;
		this.editIndex = -1;
		this._editMode = false;

		this.cdRef.detectChanges();
	}

	private addItem() {
		if (this.newValue && !this.findItem(this.newValue)) {

			this.chipValues.push(this.newValue);

			this._values.push({
				value: this.newValue,
				index: this._values.length
			});
			this.newValue = '';
		}
	}

	private findItem(item: any) {
		let found = false;

		this.chipValues.forEach((value) => {
			if (value === item) {
				found = true;
			}
		});
		return found;
	}

	private checkAddNewInputKey(e: any) {
		if (e.keyCode === enterKey) {
			console.log('Add New Input: Enter Key have been pressed (key code: ' + enterKey + ')');
			this.addItem();
		}
	}

	private checkEditInputKey(e: any) {
		if (e.keyCode === enterKey) {
			console.log('Edit Input:Enter Key have been pressed (key code: ' + enterKey + ')');
			this.endEdit();
		}
	}

	ngOnInit() {
		this.chipList = this.chipValues;
	}
}
