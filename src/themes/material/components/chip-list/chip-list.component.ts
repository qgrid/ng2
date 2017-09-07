import {
	Component,
	Input,
	OnInit,
	ChangeDetectorRef,
	ViewChildren,
	QueryList
} from '@angular/core';

import {AppError} from 'ng2-qgrid/core/infrastructure';
import {Command, CommandManager} from 'ng2-qgrid/core/command';
import {ChipComponent} from './chip/chip.component';
import {ChipState} from './chip/chip.component';

interface IChipItem {
	value?: string | any;
	state?: string;
	focusDirectiveEnabled?: boolean;
}

@Component({
	selector: 'q-grid-chip-list',
	templateUrl: './chip-list.tpl.html',
	styleUrls: ['./chip-list.scss']
})
export class ChipListComponent implements OnInit {
	@Input('values') chipValues: any[];

	@ViewChildren(ChipComponent)
	private chipList: QueryList<ChipComponent>;

	private items: IChipItem[];

	private incrementIndex(index: number) {
		if (index === this.chipValues.length) {
			index = 0;
		} else {
			index++;
		}
		return index;
	}
	private decrementIndex(index: number) {
		if (index === 0) {
			index = this.chipValues.length;
		} else {
			index--;
		}
		return index;
	}

	private indexOutOfRange(index?: number) {
		return index === undefined || index < 0 || index > this.items.length - 1;
	}

	private deleteItem = new Command({
		canExecute: (index) => !this.indexOutOfRange(index),
		execute: (index) => {
			this.chipValues.splice(index, 1);
			this.initItems(this.decrementIndex(index));
			this.cdRef.detectChanges();
		},
	});

	private editItem = new Command({
		canExecute: (index) => {
			return !this.indexOutOfRange(index) && !this.chipState(index);
		},
		execute: (index) => {
			this.items[index].state = ChipState.edited;
		},
	});

	private addItem = new Command({
		canExecute: (index) => {
			return index === this.chipValues.length && this.chipList && this.chipList.last.newValue;
			},
		execute: (value) => {
			this.chipValues.push(value);
			this.initItems(this.chipValues.length);
			this.cdRef.detectChanges();
		},
	});

	private updateItem = new Command({
		canExecute: (itemIndex) => {
			return !this.indexOutOfRange(itemIndex) &&
			this.items[itemIndex].state === ChipState.edited &&
			this.chipList.find((item, index) => index === itemIndex).editValue;
		},
		execute: (value, index) => {
			this.chipValues[index] = value;
			this.initItems(index);
			this.cdRef.detectChanges();
		},
	});

	private focusPreviousCommand = new Command({
		canExecute: (index) => !this.indexOutOfRange(index),
		execute: (index) => {
			this.initItems(this.decrementIndex(index));
		},
	});

	private focusNextCommand = new Command({
		canExecute: (index) => !this.indexOutOfRange(index),
		execute: (index) => {
			this.initItems(this.incrementIndex(index));
		},
	});

	constructor(private cdRef: ChangeDetectorRef) {
	}

	private chipState(index: number) {
		return index === this.chipValues.length ? ChipState.new : '';
	}

	private initItems(selectionIndex: number) {
		this.items = this.chipValues.map<IChipItem>((chipValue, index) => {
			return {
				value: chipValue,
				focusDirectiveEnabled: selectionIndex === index
			};
		});
		this.items.push({
			state: ChipState.new,
			focusDirectiveEnabled: selectionIndex === this.chipValues.length
		});
	}

	ngOnInit() {
		this.initItems(-1);
	}
}
