import {Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import {AppError} from '@grid/core/infrastructure';
import {Command, CommandManager} from '@grid/core/command';
import {Shortcut, ShortcutManager} from '@grid/core/shortcut';

interface IChipValue {
	index?: number;
	value?: any;
}

interface ISelectedItem {
	item: IChipValue;
	action: Actions;
}

interface ICommandSet {
	beginEdit: any;
	endEdit: any;
	addItem: any;
	deleteItem: any;
}

enum Actions {
	inactive,
	add,
	beginEdit,
	endEdit,
	delete
}

@Component({
	selector: 'q-grid-chips',
	templateUrl: './chip-list.tpl.html'
})
export class ChipListComponent implements OnInit {
	@Input('values') chipValues: any[];
	private shortcut = new Shortcut(new ShortcutManager());

	private chipValueMap: IChipValue[];

	private selectedItem: ISelectedItem = {
		item: {},
		action: Actions.inactive
	};

	private newItem: ISelectedItem = {
		item: {},
		action: Actions.inactive
	};

	get chipList(): any[] {
		return this.chipValueMap.map((item) => item.value);
	}
	set chipList(values: any[]) {
		this.chipValueMap = values.map((itemValue, itemIndex) => {
			return <IChipValue> {
				value: itemValue,
				index: itemIndex
			};
		});
	};

	private commandSet: ICommandSet = {
		beginEdit: new Command({
			canExecute: () => this.selectedItem.action === Actions.beginEdit,
			execute: () => {
				this.selectedItem.item.value = this.chipValues[this.selectedItem.item.index];
			},
			shortcut: 'enter'
		}),

		endEdit: new Command({
			canExecute: () => this.selectedItem.action === Actions.endEdit &&
				this.selectedItem.item.value,
			execute: () => {
				this.chipValues[this.selectedItem.item.index] = this.selectedItem.item.value;

				this.chipValueMap[this.selectedItem.item.index].value = this.selectedItem.item.value;
				this.resetSelectedAction();
				this.cdRef.detectChanges();
			},
			shortcut: 'enter'
		}),

		addItem: new Command({
			canExecute: () => this.newItem.action === Actions.add &&
				this.newItem.item.value && !this.findExistingItem(this.selectedItem.item.value),
			execute: () => {
				this.chipValues.push(this.newItem.item.value);

				this.chipValueMap.push({
					value: this.newItem.item.value,
					index: this.chipValueMap.length
				});

				this.resetAddNewAction();
			},
			shortcut: 'enter'
		}),

		deleteItem: new Command({
			canExecute: () => this.selectedItem.action === Actions.delete,
			execute: () => {
				this.chipValues.splice(this.selectedItem.item.index, 1);

				this.chipValueMap = this.chipValues.map((itemValue, itemIndex) => {
					return <IChipValue> {
						value: itemValue,
						index: itemIndex
					};
				});
				this.resetSelectedAction();
				this.cdRef.detectChanges();
			}
		})
	};

	constructor(private cdRef: ChangeDetectorRef) {
		const manager = new CommandManager();

		const shortcutCommands = [this.commandSet.endEdit, this.commandSet.addItem];
		const otherCommands = [this.commandSet.endEdit, this.commandSet.addItem, this.commandSet.deleteItem];

		this.shortcut.register(manager, shortcutCommands);
	}

	private setSelectedAction(action: Actions, itemIndex?: number) {
		if (itemIndex >= 0) {
			this.selectedItem.item.index = itemIndex;
		}
		this.selectedItem.action = action;
	}

	private resetSelectedAction() {
		this.setSelectedAction(Actions.inactive);
		this.selectedItem.item.value = null;
		this.selectedItem.item.index = null;
	}

	private setAddNewAction() {
		this.newItem.action = Actions.add;
	}

	private resetAddNewAction() {
		this.newItem.action = Actions.inactive;
		this.newItem.item.value = null;
		this.newItem.item.index = null;
	}

	private findExistingItem(item: any) {
		let found = false;

		this.chipValues.forEach((value) => {
			if (value === item) {
				found = true;
			}
		});
		return found;
	}

	private beginEdit(itemIndex: number) {
		this.setSelectedAction(Actions.beginEdit, itemIndex);
		if (this.commandSet.beginEdit.canExecute()) {
			this.commandSet.beginEdit.execute();
		}
	}

	private checkEndEdit(e: any) {
		this.setSelectedAction(Actions.endEdit);
		this.shortcut.keyDown(e);
	}

	private endEdit() {
		this.setSelectedAction(Actions.endEdit);
		if (this.commandSet.endEdit.canExecute()) {
			this.commandSet.endEdit.execute();
		}
	}

	private checkAdd(e: any) {
		this.setAddNewAction();
		this.shortcut.keyDown(e);
	}

	private add() {
		this.setAddNewAction();
		if (this.commandSet.addItem.canExecute()) {
			this.commandSet.addItem.execute();
		}
	}

	private delete(itemIndex: number) {
		this.setSelectedAction(Actions.delete, itemIndex);

		if (this.commandSet.deleteItem.canExecute()) {
			this.commandSet.deleteItem.execute();
		}
	}

	ngOnInit() {
		this.chipList = this.chipValues;
	}
}
