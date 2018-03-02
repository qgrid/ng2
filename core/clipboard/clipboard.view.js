import {View} from '../view';
import {Command} from '../command';
import {getType, isUndefined} from '../utility';
import {SelectionCommandManager} from './../selection/selection.command.manager';
import {ClipboardService} from './clipboard.service';
import {SelectionService} from '../selection/selection.service';
import {RowSelector} from '../row/row.selector';
import {AppError} from '../infrastructure';
import {Aggregation} from '../services';
import {getFactory as valueFactory} from '../services/value';

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

					const columns = this.model
						.view()
						.columns
						.filter(column => column.class === 'data' || column.class === 'pivot');

					const source = this.model.clipboard().source;
					const entries = selectionService.lookup(selectionItems);
					const body = rowSelector.map(entries);

					const head = body.shift();
					const foot = body.pop();

					const selector = {
						rows: {head, body, foot},
						source: source
					};

					ClipboardService.copy(selector);
				},
				shortcut: shortcut.copy
			})
		};

		return new Map(
			Object.entries(commands)
		);
	}

	value(column) {
		if (column.aggregation) {
			const aggregation = column.aggregation;
			const aggregationOptions = column.aggregationOptions;

			if (!Aggregation.hasOwnProperty(aggregation)) {
				throw new AppError(
					'row.selector',
					`Aggregation ${aggregation} is not registered`);
			}

			const rows = this.model.data().rows;
			const getValue = valueFactory(column);

			return Aggregation[aggregation](rows, getValue, aggregationOptions);
		}
		return null;
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
