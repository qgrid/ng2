import {Component,
	Input,
	Output,
	OnInit,
	OnDestroy,
	ViewChild,
	EventEmitter,
	Renderer2,
	ElementRef,
	ChangeDetectorRef} from '@angular/core';

import {AppError} from 'ng2-qgrid/core/infrastructure';
import {Command, CommandManager} from 'ng2-qgrid/core/command';
import {Shortcut, ShortcutManager} from 'ng2-qgrid/core/shortcut';
import {DomEventsBase} from 'ng2-qgrid/common/dom-events/dom-events-base';

export const ChipState = {
	readOnly: 'read-only',
	edited: 'edited',
	new: 'new'
};

enum Actions {
	add,
	beginEdit,
	endEdit,
	inactive,
}

@Component({
	selector: 'edit-chip',
	templateUrl: './edit-chip.tpl.html',
	styleUrls: ['./edit-chip.scss']
})
export class EditChipComponent extends DomEventsBase implements OnInit, OnDestroy {
	@Input() index: number;
	@Input() value: any;
	@Input() state: string;
	@Input('state') chipState: string = ChipState.readOnly;

	@Output() delete = new EventEmitter<number>();
	@Output() add = new EventEmitter();

	@ViewChild('addNewInput') addNewInput;

	private shortcut = new Shortcut(new ShortcutManager());
	private action: Actions;
	private isSelected: boolean = false;

	private newValue: string;
	private editValue: string;

	get isEdited(){
		return this.chipState === ChipState.edited;
	}

	private get isNew(){
		return this.chipState === ChipState.new;
	}

	private beginEditCommand = new Command({
		canExecute: () => {
			return this.action === Actions.beginEdit;
		},
		execute: () => {
			this.editValue = this.value;
			// this.cdRef.detectChanges();
		},
		shortcut: 'enter'
	});

	private endEditCommand = new Command({
		canExecute: () => this.action === Actions.endEdit && this.editValue,
		execute: () => {
			this.value = this.editValue;
			this.chipState = ChipState.readOnly;
			// this.cdRef.detectChanges();
		},
		shortcut: 'enter'
	});

	private addItemCommand = new Command({
		canExecute: () => this.newValue,
		execute: () => {
			this.value = this.newValue;
		},
		shortcut: 'enter'
	});

	constructor(renderer: Renderer2, elementRef: ElementRef) {
		super(renderer, elementRef);

		const manager = new CommandManager();
		const shortcutCommands = [
			this.addItemCommand,
			this.beginEditCommand,
			this.endEditCommand,
		];

		this.shortcut.register(manager, shortcutCommands);
	}

	private deleteThis() {
		this.delete.emit(this.index);
	}

	private setEndEdit() {
		if (this.action === Actions.beginEdit) {
			this.action = Actions.endEdit;
		}
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

	private setAddNew() {
	}

	private onChipClick() {
		if (this.beginEditCommand.canExecute()) {
			this.beginEditCommand.execute();
		}
	}

	private onChipBlur() {
		this.isSelected = false;
	}

	private onChipKeyUp(e) {
		this.shortcut.keyDown(e);
	}

	private onChipFocus() {
		this.isSelected = true;
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
	}
}
