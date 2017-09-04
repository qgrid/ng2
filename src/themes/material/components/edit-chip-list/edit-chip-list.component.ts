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
import {Shortcut, ShortcutManager} from 'ng2-qgrid/core/shortcut';
import {EditChipComponent} from './edit-chip/edit-chip.component';
import {ChipState} from './edit-chip/edit-chip.component';

interface ISelected {
	index?: number;
	value?: string;
	action: Actions;
}

interface IChipItem {
	value?: string | any;
	state?: string;
	qGridFocusEnabled?: boolean;
}

enum Actions {
	add,
	delete,
	focusNext,
	focusPrevious,
	inactive,
}

@Component({
	selector: 'q-grid-chip-list',
	templateUrl: './edit-chip-list.tpl.html',
	styleUrls: ['./edit-chip-list.scss']
})
export class EditChipListComponent implements OnInit {
	@Input('values') chipValues: any[];

	@ViewChildren(EditChipComponent)
	private chipList: QueryList<EditChipComponent>;

	private items: IChipItem[];

	private shortcut = new Shortcut(new ShortcutManager());

	private selectedItem: ISelected = {
		action: Actions.inactive
	};

	private incrementSelectedIndex() {
		if (this.selectedItem.index === this.chipValues.length) {
			this.selectedItem.index = 0;
		} else {
			this.selectedItem.index++;
		}
	}
	private decrementSelectedIndex() {
		if (this.selectedItem.index === 0) {
			this.selectedItem.index = this.chipValues.length;
		} else {
			this.selectedItem.index--;
		}
	}

	private indexOutOfRange(index?: number) {
		return index === undefined || index < 0 || index > this.items.length - 1;
	}

	private deleteItemCommand = new Command({
		canExecute: () => this.selectedItem.action === Actions.delete,
		execute: () => {
			this.chipValues.splice(this.selectedItem.index, 1);
			this.decrementSelectedIndex();
			this.initItems();
			this.resetCurrentAction();
			this.cdRef.detectChanges();
		},
	});

	private addItemCommand = new Command({
		canExecute: (value) => value,
		execute: (value) => {
			this.chipValues.push(value);
			this.selectedItem.index = this.chipValues.length;
			this.initItems();
			this.cdRef.detectChanges();
		},
	});

	private saveItemValueCommand = new Command({
		canExecute: (value, index) => value && index < this.chipValues.length,
		execute: (value, index) => {
			this.chipValues[index] = value;
			this.selectedItem.index = index;
			this.initItems();
			this.cdRef.detectChanges();
		},
	});

	private focusPreviousCommand = new Command({
		canExecute: () => this.selectedItem.action === Actions.focusPrevious &&
			!this.indexOutOfRange(this.selectedItem.index),
		execute: () => {
			this.decrementSelectedIndex();
			this.initItems();
		},
	});

	private focusNextCommand = new Command({
		canExecute: () => this.selectedItem.action === Actions.focusNext &&
			!this.indexOutOfRange(this.selectedItem.index),
		execute: () => {
			this.incrementSelectedIndex();
			this.initItems();
		},
	});

	constructor(private cdRef: ChangeDetectorRef) {
	}

	private chipState(index: number) {
		return index === this.chipValues.length ? ChipState.new : '';
	}

	private focusToPreviousItem(currentIndex: number) {
		this.selectedItem = {
			index: currentIndex,
			action: Actions.focusPrevious
		};

		if (this.focusPreviousCommand.canExecute()) {
			this.focusPreviousCommand.execute();
		}
	}

	private focusToNextItem(currentIndex: number) {
		this.selectedItem = {
			index: currentIndex,
			action: Actions.focusNext
		};
		if (this.focusNextCommand.canExecute()) {
			this.focusNextCommand.execute();
		}
	}

	private resetCurrentAction() {
		this.selectedItem.action = Actions.inactive;
	}

	private saveItem(value: string | any, index: number) {
		if (this.saveItemValueCommand.canExecute(value, index)) {
			this.saveItemValueCommand.execute(value, index);
		}
	}

	private deleteChip(itemIndex: number) {
		this.selectedItem = {
			index: itemIndex,
			action: Actions.delete
		};

		if (this.deleteItemCommand.canExecute()) {
			this.deleteItemCommand.execute();
		}
	}

	private addNew(value: string | any) {
		if (this.addItemCommand.canExecute(value)) {
			this.addItemCommand.execute(value);
		}
	}

	private initItems() {
		this.items = this.chipValues.map<IChipItem>((chipValue, index) => {
			return {
				value: chipValue,
				qGridFocusEnabled: this.isFocusEnabled(index)
			};
		});
		this.items.push({
			state: ChipState.new,
			qGridFocusEnabled: this.isFocusEnabled(this.chipValues.length)
		});
	}

	isFocusEnabled(index: number) {
		return this.selectedItem && this.selectedItem.index === index ? true : false;
	}

	ngOnInit() {
		this.initItems();
	}
}
