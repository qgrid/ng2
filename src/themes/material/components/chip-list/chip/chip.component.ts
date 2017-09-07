import {
	Component,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';

import {AppError} from 'ng2-qgrid/core/infrastructure';
import {Command, CommandManager} from 'ng2-qgrid/core/command';
import {Shortcut, ShortcutManager} from 'ng2-qgrid/core/shortcut';

export const ChipState = {
	edited: 'edited',
	new: 'new'
};

@Component({
	selector: 'edit-chip',
	templateUrl: './chip.tpl.html',
	styleUrls: ['./chip.scss']
})
export class ChipComponent {
	@Input() index: number;
	@Input() value: string | any;

	@Input('focus-directive-disabled')
	isFocusDisabled: boolean = true;

	@Input('can-focus-previous') canFocusPrevious: boolean;
	@Input('can-focus-next') canFocusNext: boolean;
	@Input('can-add') canAdd: boolean;
	@Input('can-edit') canEdit: boolean;
	@Input('can-update') canUpdate: boolean;
	@Input('can-delete') canDelete: boolean;
	@Input('state') chipState: string;

	@Output('delete') onDelete = new EventEmitter<number>();
	@Output('add') onAdd = new EventEmitter<string | any>();
	@Output('update') onUpdate = new EventEmitter<string | any>();
	@Output('edit') onEdit = new EventEmitter<number>();

	@Output('focus-previous') onFocusPrevious = new EventEmitter<number>();
	@Output('focus-next') onFocusNext = new EventEmitter<number>();

	/// Public members
	newValue: string;
	editValue: string;

	isSelected: boolean = false;

	get isEdited() {
		return this.chipState === ChipState.edited;
	}

	constructor() {

		const manager = new CommandManager();
		const shortcutCommands = [
			this.create,
			this.remove,
			this.edit,
			this.update,
			this.focusNext,
			this.focusPrevious,
			this.focusPreviousFromPlaceholder
		];

		this.shortcut.register(manager, shortcutCommands);
	}

	/// Private members
	private shortcut = new Shortcut(new ShortcutManager());

	/// Command set block
	private edit = new Command({
		canExecute: () => {
			return this.canEdit && this.isReadOnly && this.isSelected;
		},
		execute: () => {
			this.editValue = this.value;
			this.onEdit.emit(this.index);
		},
		shortcut: 'enter'
	});

	private update = new Command({
		canExecute: () => {
			return this.canUpdate && this.isEdited && this.editValue;
			},
		execute: () => {
			this.onUpdate.emit(this.editValue);
			this.resetChipState();
			this.editValue = '';
		},
		shortcut: 'enter'
	});

	private create = new Command({
		canExecute: () => {
			return this.canAdd && this.isNew && this.newValue;
		},
		execute: () => {
			this.onAdd.emit(this.newValue);
			this.resetChipState();
			this.newValue = '';
		},
		shortcut: 'enter'
	});

	private remove = new Command({
		canExecute: () => {
			return this.canDelete && this.isReadOnly && this.isSelected;
		},
		execute: () => {
			this.onDelete.emit(this.index);
		},
		shortcut: 'backspace'
	});

	private focusNext = new Command({
		canExecute: () => this.canMoveFocus && this.canFocusNext,
		execute: () => {
			this.onFocusNext.emit(this.index);
		},
		shortcut: 'right'
	});

	private focusPrevious = new Command({
		canExecute: () => this.canMoveFocus && this.canFocusPrevious,
		execute: () => {
			this.onFocusPrevious.emit(this.index);
		},
		shortcut: 'left'
	});

	private focusPreviousFromPlaceholder = new Command({
		canExecute: () => {
			return this.isNew && this.focusPrevious.canExecute();
		},
		execute: () => {
			this.onFocusPrevious.emit(this.index);
		},
		shortcut: 'backspace'
	});
	/// End Command Set block ---------------------------

	private get isNew() {
		return this.chipState === ChipState.new;
	}

	private get isReadOnly() {
		return !(this.isEdited || this.isNew);
	}

	private get canMoveFocus() {
		return this.isReadOnly && this.isSelected || this.isNew && !this.newValue;
	}

	private resetChipState() {
		this.chipState = '';
		this.isSelected = false;
	}

	private beginEdit(canExecute: boolean) {
		if (canExecute) {
			this.edit.execute();
		}
	}

	private endEdit(canExecute: boolean) {
		if (canExecute) {
			this.update.execute();
		}
		this.isSelected = false;
	}

	private deselect() {
		this.isSelected = false;
	}

	private execShortcut(e) {
		this.shortcut.keyDown(e);
	}

	private select(event: any) {
		setTimeout(() => {
			this.isSelected = true;
		}, 200);
	}
}
