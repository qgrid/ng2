import {View} from '../view';
import {Command} from '../command';
import {getType, isUndefined} from '../utility';
import {SelectionCommandManager} from './../selection/selection.command.manager';
import {ClipboardService} from './clipboard.service';
import {SelectionService} from '../selection/selection.service';
import {RowSelector} from '../row/row.selector';
import {AppError} from '../infrastructure';

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
					const source = this.model.clipboard().source.join(', ').toLowerCase();
					const entries = selectionService.lookup(selectionItems);
					const rows = rowSelector.map(entries);
					const head = rows.shift();
					const foot = rows.pop();

					switch (source) {
						case 'body':
							ClipboardService.copy(rows);
							break;

						case body_head(source):
							ClipboardService.copy(rows, head);
							break;

						case body_head_foot(source):
							ClipboardService.copy(rows, head, foot);
							break;

						default:
							throw new AppError('clipboard.view', `Invalid unit ${source}, should be from [body, head, foot] range`);
					}

				},
				shortcut: shortcut.copy
			})
		};

		return new Map(
			Object.entries(commands)
		);
	}
}

function body_head(source) {
	if(source.includes('head') && source.includes('body') && source.split(', ').length === 2) {
		return source;
	}
}

function body_head_foot(source) {

	if(source.includes('head') && source.includes('body') && source.includes('foot') && source.split(', ').length === 3) {
		return source;
	}

}
