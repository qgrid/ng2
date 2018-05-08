import { View } from '../view';
import { Command } from '../command';
import { getType, isUndefined } from '../utility';
import { SelectionCommandManager } from './../selection/selection.command.manager';
import { ClipboardService } from './clipboard.service';
import { SelectionService } from '../selection/selection.service';
import { RowSelector } from '../row/row.selector';
import { EditCellView } from '../edit/edit.cell.view';
import { CommandManager } from '../command/command.manager';
import { CellEditor } from '../edit/edit.cell.editor';

export class ClipboardView extends View {
	constructor(model, table, commandManager) {
		super(model);

		this.model = model;
		this.table = table;

		const selectionCommandManager = new SelectionCommandManager(model, commandManager);
		const action = model.action().shortcut;
		const commands = this.commands;

		document.addEventListener('paste', (e) => {
			e.stopPropagation();
			e.preventDefault();

			const navigation = model.navigation();
			const editView = new EditCellView(this.model, this.table, new CommandManager());

			const clipboardData = e.clipboardData;
			const pastedData = clipboardData.getData('Text');
			const splited = pastedData.split("\n");
			const result = splited.slice(0, splited.length - 1);
			let navigatedCell = navigation.cell;
			let rowIndex = navigatedCell.rowIndex;
			let columnIndex = navigatedCell.columnIndex;

			for (let i = 0; i < result.length; i++) {
				let cells = result[i].split("\t");

				for(let j = 0; j < cells.length; j++) {
					const label = cells[j];
					const last = j === cells.length - 1;
					if (navigatedCell) {
						const cellView = this.table.body.cell(rowIndex, columnIndex).model();
						changeLabel(cellView, editView, label);
						navigatedCell = null;
					} else {
						columnIndex += 1;
						const cellView = this.table.body.cell(rowIndex, columnIndex).model();
						changeLabel(cellView, editView, label);
					}

					if (last) {
						navigatedCell = model.navigation().cell;
						rowIndex = navigatedCell.rowIndex + 1;
						columnIndex = navigatedCell.columnIndex;
					}

				}
			}
		});

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
			}),
			paste: new Command({
				source: 'clipboard.view',
				execute: e => {
					const navigation = this.model.navigation();
					const cell = navigation.cell;
					// document.dispatchEvent(this.pasteEvent);
					const temp = 123;


				},
				// shortcut: shortcut.paste
			})
		};

		return new Map(
			Object.entries(commands)
		);
	}
}

function changeLabel(cell, edit, label) {
	const editor = new CellEditor(cell);
	editor.label = label;
	editor.value = label;
	edit.editor = editor;
	edit.batchCommit.execute();
}
