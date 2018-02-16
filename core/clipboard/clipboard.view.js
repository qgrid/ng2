import {View} from '../view';
import {Command} from '../command';
import {getType, isUndefined} from '../utility';
import {SelectionCommandManager} from './../selection/selection.command.manager';
import {ClipboardService} from './clipboard.service';
import {SelectionService} from '../selection/selection.service';
import {RowSelector} from '../row/row.selector';

export class ClipboardView extends View {
	constructor(model, commandManager) {
		super(model);

		const selectionCommandManager = new SelectionCommandManager(model, commandManager);
		const action = model.action().shortcut;
		const commands = this.commands;

		this.using(action.register(selectionCommandManager, commands));
	}

	get commands() {
		const selectionState = this.model.selection();
		const shortcut = this.model.clipboard().shortcut;

		const commands = {
			copy: new Command({
				source: 'clipboard.view',
				canExecute: () => selectionState.items.length > 0,
				execute: () => {
					const selectionService = new SelectionService(this.model);
					const rowSelector = new RowSelector(this.model);
					const selectionItems = selectionState.items;
					const entries = selectionService.lookup(selectionItems);
					const rows = rowSelector.map(entries);

					ClipboardService.copy(rows);
				},
				shortcut: shortcut.copy
			})
		};

		return new Map(
			Object.entries(commands)
		);
	}
}
