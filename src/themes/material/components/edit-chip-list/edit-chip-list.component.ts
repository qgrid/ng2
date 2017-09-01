import {Component, Input, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ViewChildren} from '@angular/core';
import {AppError} from 'ng2-qgrid/core/infrastructure';
import {Command, CommandManager} from 'ng2-qgrid/core/command';
import {Shortcut, ShortcutManager} from 'ng2-qgrid/core/shortcut';
import {EditChipComponent} from './edit-chip/edit-chip.component';

interface ISelected {
	previousIndex?: number;
	currentIndex?: number;
	value?: string;
	action: Actions;
}

enum Actions {
	add,
	beginEdit,
	endEdit,
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
export class EditChipListComponent implements OnInit, OnDestroy {
	@Input('values') chipValues: any[];
	@ViewChildren(EditChipComponent)
	private chips: EditChipComponent[];

	private shortcut = new Shortcut(new ShortcutManager());

	private selectedItem: ISelected = {
		action: Actions.inactive
	};

	private newValue: string;

	private beginEditCommand = new Command({
		canExecute: () => {
			let canExec = this.selectedItem.previousIndex === this.selectedItem.currentIndex;
			return canExec;
			},
		execute: () => {
			this.selectedItem.action = Actions.beginEdit;
			this.selectedItem.value = this.chipValues[this.selectedItem.currentIndex];
			// this.cdRef.detectChanges();
		},
		shortcut: 'enter'
	});

	private endEditCommand = new Command({
		canExecute: () => this.selectedItem.action === Actions.endEdit &&
			this.selectedItem.value,
		execute: () => {
			this.chipValues[this.selectedItem.currentIndex] = this.selectedItem.value;
			this.resetCurrentAction();
			this.cdRef.detectChanges();
		},
		shortcut: 'enter'
	});

	private addItemCommand = new Command({
		canExecute: () => this.newValue,
		execute: () => {
			this.chipValues[this.chipValues.length - 1] = this.newValue;
			this.chipValues.push('');
			this.newValue = '';
			this.cdRef.detectChanges();
		},
		shortcut: 'enter'
	});

	private deleteItemCommand = new Command({
		canExecute: () => this.selectedItem.action === Actions.delete,
		execute: () => {
			this.chipValues.splice(this.selectedItem.currentIndex, 1);
			this.resetCurrentAction();
			this.cdRef.detectChanges();
		},
		shortcut: 'backspace'
	});

	private focusNextCommand = new Command({
		canExecute: () => false,
		execute: () => {
		},
		shortcut: 'right'
	});

	private focusPreviousCommand = new Command({
		canExecute: () => false,
		execute: () => {
		},
		shortcut: 'left'
	});

	constructor(private cdRef: ChangeDetectorRef) {
		const manager = new CommandManager();

		const shortcutCommands = [
			this.addItemCommand,
			this.beginEditCommand,
			this.endEditCommand,
			this.deleteItemCommand,
			this.focusNextCommand,
			this.focusPreviousCommand
		];
		this.shortcut.register(manager, shortcutCommands);
	}

	private resetCurrentAction() {
		this.selectedItem = {action: Actions.inactive};
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

	private checkEndEdit(e: any) {
		this.setEndEdit();
		this.shortcut.keyDown(e);
	}

	private endEdit() {
		this.setEndEdit();
		if (this.endEditCommand.canExecute()) {
			this.endEditCommand.execute();
		}
	}

	private checkAdd(e: any) {
		this.shortcut.keyDown(e);
	}

	private delete(itemIndex: number) {
		this.selectedItem = {
			currentIndex: itemIndex,
			action: Actions.delete
		};

		if (this.deleteItemCommand.canExecute()) {
			this.deleteItemCommand.execute();
		}
	}

	private setEndEdit() {
		if (this.selectedItem.action === Actions.beginEdit) {
			this.selectedItem.action = Actions.endEdit;
		}
	}

	private setAddNew() {
		this.selectedItem = {
			action: Actions.add,
			value: this.newValue
		};
	}

	private isGetFocus: boolean = false;

	private onChipClick(index: number) {
		if (!this.isGetFocus) {
			this.selectChip(index);
		} else {
			this.isGetFocus = false;
		}
		if (this.beginEditCommand.canExecute()) {
			this.beginEditCommand.execute();
		}
	}

	private onChipBlur() {
		this.deselectChip();
		this.isGetFocus = false;
	}

	private isEdited(index: number) {
		return this.selectedItem.currentIndex === index &&
			(this.selectedItem.action === Actions.beginEdit ||
				this.selectedItem.action === Actions.endEdit);
	}

	private isNew(index: number) {
		return index === this.chipValues.length - 1;
	}

	private onChipKeyUp(e, index) {
		this.shortcut.keyDown(e);
	}

	private onChipFocus(index) {
		if (this.selectedItem.currentIndex !== index) {
			this.selectChip(index);
			this.isGetFocus = true;
		}
	}

	private selectChip(index) {
		setTimeout(() => {
			this.selectedItem.previousIndex = this.selectedItem.currentIndex;
			this.selectedItem.currentIndex = index;
			this.cdRef.detectChanges();
		}, 300);
	}

	private deselectChip() {
		this.selectedItem.previousIndex = this.selectedItem.currentIndex;
		this.selectedItem.currentIndex = -1;
		// this.cdRef.detectChanges();
	}
	private isChipSelected(index) {
		return this.selectedItem.currentIndex === index;
	}

	ngOnInit() {
		this.chipValues.push('');
	}

	ngOnDestroy() {
		// this.cdRef.detach();
	}
}
