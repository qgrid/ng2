import {
	Component,
	Input,
	Output,
	ViewChild,
	EventEmitter,
	Renderer2,
	ElementRef
} from '@angular/core';

import {AppError} from 'ng2-qgrid/core/infrastructure';
import {Command, CommandManager} from 'ng2-qgrid/core/command';
import {Shortcut, ShortcutManager} from 'ng2-qgrid/core/shortcut';
import {Dom} from 'ng2-qgrid/common/dom/dom';

export const ChipState = {
	edited: 'edited',
	new: 'new'
};

enum NextAction {
	add,
	beginEdit,
	endEdit,
	nothing
}

@Component({
	selector: 'edit-chip',
	templateUrl: './edit-chip.tpl.html',
	styleUrls: ['./edit-chip.scss']
})
export class EditChipComponent extends Dom {
	@Input() index: number;
	@Input() value: string | any;
	@Input() state: string;
	@Input('state') chipState: string;

	@Input('focus-directive-disabled')
	focusDirectiveDisabled: boolean = true;

	@Output() delete = new EventEmitter<number>();
	@Output() add = new EventEmitter<string|any>();
	@Output() save = new EventEmitter<string|any>();

	@Output('focus-previous') focusPrevious = new EventEmitter<number>();
	@Output('focus-next') focusNext = new EventEmitter<number>();

	private shortcut = new Shortcut(new ShortcutManager());
	private nextAction = NextAction.beginEdit;

	private newValue: string;
	private editValue: string;

	isSelected: boolean = false;

	get isEdited() {
		return this.chipState === ChipState.edited;
	}

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
	}

	private beginEditCommand = new Command({
		canExecute: () => this.nextAction === NextAction.beginEdit && this.isSelected,
		execute: () => {
			this.editValue = this.value;
			this.chipState = ChipState.edited;
			this.nextAction = NextAction.endEdit;
		},
		shortcut: 'enter'
	});

	private endEditCommand = new Command({
		canExecute: () => this.nextAction === NextAction.endEdit && this.editValue,
		execute: () => {
			this.save.emit(this.editValue);
			this.endEdit();
			this.editValue = '';
		},
		shortcut: 'enter'
	});

	private addItemCommand = new Command({
		canExecute: () => this.nextAction === NextAction.add && this.newValue,
		execute: () => {
			this.add.emit(this.newValue);
			this.endEdit();
			this.newValue = '';
		},
		shortcut: 'enter'
	});

	private deleteItemCommand = new Command({
		canExecute: () => this.isReadOnly && this.isSelected,
		execute: () => {
			this.delete.emit(this.index);
		},
		shortcut: 'backspace'
	});

	private focusNextCommand = new Command({
		canExecute: () => this.canMoveFocus,
		execute: () => {
			this.focusNext.emit(this.index);
		},
		shortcut: 'right'
	});

	private focusPreviousCommand = new Command({
		canExecute: () => this.canMoveFocus,
		execute: () => {
			this.focusPrevious.emit(this.index);
		},
		shortcut: 'left'
	});

	private focusPreviousFromAddNewInputCommand = new Command({
		canExecute: () => this.canMoveFocus,
		execute: () => {
			this.focusPrevious.emit(this.index);
		},
		shortcut: 'backspace'
	});

	constructor(renderer: Renderer2, elementRef: ElementRef) {
		super(renderer, elementRef);

		const manager = new CommandManager();
		const shortcutCommands = [
			this.addItemCommand,
			this.deleteItemCommand,
			this.beginEditCommand,
			this.endEditCommand,
			this.focusNextCommand,
			this.focusPreviousCommand,
			this.focusPreviousFromAddNewInputCommand
		];

		this.shortcut.register(manager, shortcutCommands);
	}

	private deleteThis() {
		this.isSelected = true;
		if (this.deleteItemCommand.canExecute()) {
			this.deleteItemCommand.execute();
		}
	}

	private onAddNewKeyUp(e: any) {
		this.shortcut.keyDown(e);
	}

	private checkEndEdit(e: any) {
		this.shortcut.keyDown(e);
	}

	private endEdit() {
		this.resetChipState();
		this.nextAction = NextAction.nothing;
		this.isSelected = false;
	}

	private onChipClick() {
		if (this.beginEditCommand.canExecute()) {
			this.beginEditCommand.execute();
		}
	}
	private onEditBlur() {
		if (this.endEditCommand.canExecute()) {
			this.endEditCommand.execute();
		}
		this.isSelected = false;
		this.nextAction = NextAction.nothing;
	}

	private onChipBlur() {
		this.isSelected = false;
		this.nextAction = NextAction.nothing;
	}

	private onChipKeyUp(e) {
		this.shortcut.keyDown(e);
	}

	private onChipFocus(event: any) {
		setTimeout(() => {
			this.isSelected = true;
			this.nextAction = NextAction.beginEdit;
		}, 200);
	}

	private onAddNewFocus() {
		this.nextAction = NextAction.add;
	}

	private onAddNewBlur() {
		setTimeout(() => {
			this.nextAction = NextAction.nothing;
		}, 100);
	}
}
