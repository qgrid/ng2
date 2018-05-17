import { GRID_PREFIX } from '../definition';
import { View } from '../view';
import { Command } from '../command';
import { isUndefined } from '../utility';
import { SelectionCommandManager } from './../selection/selection.command.manager';
import { ClipboardService } from './clipboard.service';
import { SelectionService } from '../selection/selection.service';
import { RowSelector } from '../row/row.selector';
import { EditCellView } from '../edit/edit.cell.view';
import { CommandManager } from '../command/command.manager';
import { CellEditor } from '../edit/edit.cell.editor';
import { EventListener, EventManager } from '../../core/infrastructure';

export class ClipboardView extends View {
	constructor(model, table, commandManager) {
		super(model);

		this.model = model;
		this.table = table;

		const selectionCommandManager = new SelectionCommandManager(model, commandManager);
		const action = model.action().shortcut;
		const commands = this.commands;

		const documentListener = new EventListener(document, new EventManager(this));

		this.using(documentListener.on('paste', (e) => {
			e.stopPropagation();
			e.preventDefault();

			const navigation = model.navigation();
			const editView = new EditCellView(this.model, this.table, new CommandManager());

			const data = insertedData(e);

			let initialCell = navigation.cell;
			let nextCellFlag = false;

			let rowIndex = initialCell.rowIndex;
			let columnIndex = initialCell.columnIndex;

			for (let i = 0; i < data.length; i++) {
				let cells = data[i].split('\t');

				for(let j = 0; j < cells.length; j++) {
					const label = cells[j];
					const isLast = j === cells.length - 1;
					if (initialCell && !nextCellFlag) {
						const cellView = this.table.body.cell(rowIndex, columnIndex).model();
						changeLabel(cellView, editView, label);
						if (!isLast) {
							nextCellFlag = true;
						}
					} else if (nextCellFlag) {
						columnIndex += 1;
						const cellView = this.table.body.cell(rowIndex, columnIndex).model();
						changeLabel(cellView, editView, label);
					}

					if (isLast) {
						rowIndex = initialCell.rowIndex + (i + 1);
						columnIndex = initialCell.columnIndex;
						nextCellFlag = false;
					}
				}
			}
		}));
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
			})
		};

		return new Map(
			Object.entries(commands)
		);
	}
}

function changeLabel(cell, edit, label) {
	const columnType = cell.column.type;
	const labelType = getType(label);

	if(columnType !== 'id' && columnType !== 'array') {
		if (columnType === labelType) {
			const td = cell.model.$implicit.element;
			td.classList.add(`${GRID_PREFIX}-selected`);

			const editor = new CellEditor(cell);
			editor.label = label;
			editor.value = label;
			edit.editor = editor;
			edit.batchCommit.execute();
		}
	}
}

function insertedData(e) {
	const clipboardData = e.clipboardData;
	const pasted = clipboardData.getData('Text');
	const values = pasted.split('\n');

	return values.slice(0, values.length - 1);
}

function getType(text) {
	const symbols = text.split('').slice(0, text.length - 1);

	const isText = symbols.every(s => s.charCodeAt(0) >= 65 && s.charCodeAt(0) <= 122);
	if (isText) {
		return 'text';
	}

	const isNumber = symbols.every(s => s.charCodeAt(0) >= 48 && s.charCodeAt(0) <= 57 ||  s.charCodeAt(0) === 46);
	if (isNumber) {
		return 'number';
	}

	const date = new Date(text);
	if (date && isFinite(date)) {
		return 'date';
	}

	if (text.includes('@')) {
		return 'email';
	}
}










































