import {
	Component,
	Input,
	AfterViewInit,
	OnInit,
	OnDestroy,
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
	previousIndex?: number;
	currentIndex?: number;
	value?: string;
	action: Actions;
}

interface IChipItem {
	value?: string | any;
	state?: string;
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
export class EditChipListComponent implements AfterViewInit, OnInit, OnDestroy {
	@Input('values') chipValues: any[];

	@ViewChildren(EditChipComponent)
	private chipList: QueryList<EditChipComponent>;

	private items: IChipItem[];

	private shortcut = new Shortcut(new ShortcutManager());

	private selectedItem: ISelected = {
		action: Actions.inactive
	};

	private deleteItemCommand = new Command({
		canExecute: () => this.selectedItem.action === Actions.delete,
		execute: () => {
			this.chipValues.splice(this.selectedItem.currentIndex, 1);
			this.initItems();
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
			this.deleteItemCommand,
			this.focusNextCommand,
			this.focusPreviousCommand
		];
		this.shortcut.register(manager, shortcutCommands);
	}

	private chipState(index: number) {
		return index === this.chipValues.length - 1 ? ChipState.new : ChipState.readOnly;
	}

	private findChip(itemIndex: number): EditChipComponent {
		return this.chipList.find((item, index) => itemIndex === index );
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

	private deleteChip(itemIndex: number) {
		this.selectedItem = {
			currentIndex: itemIndex,
			action: Actions.delete
		};

		if (this.deleteItemCommand.canExecute()) {
			this.deleteItemCommand.execute();
		}
	}

	private addNew() {
		this.chipValues.push('');
		this.cdRef.detectChanges();
	}

	private initItems() {
		this.items = this.chipValues.map<IChipItem>((item) => { return  {value:  item}; } );
		this.items.push({ state: ChipState.new });
	}

	ngAfterViewInit(): void {
	}

	ngOnInit() {
		this.initItems();
	}

	ngOnDestroy() {
		// this.cdRef.detach();
	}
}
