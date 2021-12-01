import * as columnService from '@qgrid/core';
import { filter, takeOnce, Event, EventListener, EventManager, checkButtonCode, LEFT_BUTTON, MIDDLE_BUTTON, elementFromPoint, Command, preOrderDFS, copy, Aggregation, isFunction, identity, Resource, getLabelFactory, isUndefined, clone, isArray, parseFactory, Fastdom, GRID_PREFIX, cloneDeep, isObject, isNumber, isDate, isBoolean, Action, GridError, setValue, setLabel, Composite, RowEditor, graphFlatView, PluginService, CsvExport, JsonExport, XmlExport, jobLine, CsvImport, generate, columnFactory, firstRowTitle, XmlImport, JsonImport, alphaTitle, numericTitle, upload, FocusAfterRenderService, PersistenceService, CommandManager, Shortcut, ShortcutDispatcher, serialize, stringifyFactory, max, PipeUnit, serializeGet, serializePost, hasRules, createValidator, isString, same } from '@qgrid/core';

class AutofocusPlugin {
	constructor(plugin) {
		const { model, table, observeReply } = plugin;

		observeReply(model.sceneChanged)
			.pipe(
				filter(e => {
					if (e.hasChanges('status') && e.state.status === 'stop') {
						const count = table.body.rowCount(0);
						if (count) {
							return true;
						}
					}

					return false;
				}),
				takeOnce()
			)
			.subscribe(() => {
				const key = Object.keys(table.box.markup).find(p => p.startsWith('body'));

				if (key) {
					const element = table.box.markup[key];
					if (element) {
						element.focus();
					}
				}

				const { body } = table;
				const { focus } = model;
				const focusState = focus();
				const cell = body.cell(focusState.rowIndex, focusState.columnIndex);
				const cellModel = cell.model();

				if (!cellModel || !cellModel.column.canFocus) {
					let rowIndex = 0;
					const rowCount = body.rowCount(0);
					while (rowIndex < rowCount) {
						const row = body.row(rowIndex);
						const cells = row.cells();
						const columnIndex = cells.findIndex(c => {
							const m = c.model();
							return m && m.column.canFocus;
						});

						if (columnIndex >= 0) {
							focus({ rowIndex, columnIndex }, { source: 'autofocus.plugin' });
							break;
						}

						rowIndex++;
					}
				}
			});
	}
}

class BackdropPlugin {
	constructor(context) {
		this.closeEvent = new Event();

		const element = context.element;
		const listener = new EventListener(element, new EventManager(this));

		listener.on('mousedown', e => {
			if (checkButtonCode(e, LEFT_BUTTON) || checkButtonCode(e, MIDDLE_BUTTON)) {
				e.stopPropagation();
				element.remove();

				if (context.propagate !== false) {
					const target = elementFromPoint(e.clientX, e.clientY);
					const event = document.createEvent('MouseEvents');
					event.initEvent('mousedown', true, true);
					target.dispatchEvent(event);
				}

				this.closeEvent.emit(e);
			}
		});

		listener.on('keydown', e => context.onKeyDown({ $event: e }));
	}
}

class ColumnChooserPlugin {
	constructor(plugin, context) {
		this.plugin = plugin;

		this.context = context;

		this.cancelEvent = new Event();
		this.submitEvent = new Event();
		this.dropEvent = new Event();

		const setup = () => {
			const { model: gridModel } = this.plugin;
			const { index } = gridModel.columnList();

			this.tree = preOrderDFS([index], (node, current, parent) => {
				const { model } = node.key;
				const column = {
					key: model.key,
					title: model.title,
					isVisible: model.isVisible,
					isDefault: model.isDefault,
					canMove: model.canMove,
					aggregation: model.aggregation
				};

				if (parent) {
					const newNode = copy(node);
					newNode.value = {
						column,
						isVisible: model.category === 'data' || model.category === 'cohort',
					};

					current.children.push(newNode);
					return newNode;
				}

				current.value = { column, isVisible: true };
				return current;
			}, copy(index));

			updateView();
		};

		let applyFilter = identity;
		const updateView = () => {
			this.listView = [];
			this.treeView = applyFilter(this.tree);
			preOrderDFS([this.treeView], n => {
				if (n.value.isVisible) {
					this.listView.push(n.value.column);
				}
			});
		};

		this.search = value => {
			const search = ('' + value).toLowerCase();
			applyFilter =
				search
					? node => filterNode(node, n => (n.value.column.title || '').toLowerCase().indexOf(search) >= 0)
					: identity;

			updateView();
		};

		setup();

		const toggle = (node, value) => {
			const { children } = node;
			const { column } = node.value;
			column.isVisible = value;
			if (children.length) {
				children.forEach(n => toggle(n, value));
			}
		};

		this.toggle = new Command({
			source: 'column.chooser',
			canExecute: node => node.value.isVisible,
			execute: node => toggle(node, !this.state(node))
		});

		this.toggleAll = new Command({
			source: 'column.chooser',
			execute: () => {
				const state = !this.stateAll();
				for (let column of this.listView) {
					column.isVisible = state;
				}
			}
		});

		this.defaults = new Command({
			source: 'column.chooser',
			execute: () => {
				for (let column of this.listView) {
					column.isVisible = column.isDefault !== false;
				}
			}
		});

		this.toggleAggregation = new Command({ source: 'column.chooser' });

		this.drop = new Command({
			source: 'column.chooser',
			canExecute: e => {
				const node = e.dropData;
				return node && node.value.column.canMove;

			},
			execute: e => {
				switch (e.action) {
					case 'over': {
						const src = e.dragData;
						const trg = e.dropData;
						if (src !== trg) {
							const tree = this.tree;

							const oldPos = findNode(tree, node => node === src);
							const newPos = findNode(tree, node => node === trg);
							if (oldPos && newPos && newPos.path.indexOf(oldPos.node) < 0) {
								const queue = oldPos.path.reverse();
								const hostIndex = queue.findIndex(node => node.children.length > 1);
								if (hostIndex >= 0) {
									const host = queue[hostIndex];
									const target = queue[hostIndex - 1] || oldPos.node;
									const index = host.children.indexOf(target);

									host.children.splice(index, 1);
									newPos.parent.children.splice(newPos.index, 0, target);

									target.level = newPos.parent.level + 1;
									preOrderDFS(
										target.children,
										(node, root, parent) => {
											node.level = (root || parent).level + 1;
										},
										target
									);

									this.dropEvent.emit();
								}
							}
						}
						break;
					}
				}
			}
		});

		this.drag = new Command({
			source: 'column.chooser',
			canExecute: e => {
				const node = e.data;
				return node && node.value.column.canMove;
			}
		});

		this.submit = new Command({
			source: 'column.chooser',
			execute: () => {
				const index = preOrderDFS([this.tree], (node, current, parent) => {
					if (parent) {
						const newNode = copy(node);
						current.children.push(newNode);

						const { isVisible, column } = node.value;
						if (isVisible) {
							const { model } = newNode.key;
							model.isVisible = column.isVisible;
							model.aggregation = column.aggregation;
						}

						newNode.value = null;
						return newNode;
					}

					current.value = null;
					return current;
				}, copy(this.tree));

				const { model: gridModel } = this.plugin;
				gridModel.columnList({ index }, {
					source: 'column.chooser.view'
				});

				this.submitEvent.emit();
			}
		});

		this.cancel = new Command({
			source: 'column.chooser',
			execute: () => this.cancelEvent.emit()
		});

		this.reset = new Command({
			source: 'column.chooser',
			execute: () => setup()
		});

		this.aggregations = Object
			.getOwnPropertyNames(Aggregation)
			.filter(key => isFunction(Aggregation[key]));

		const { model: gridModel, observe } = this.plugin;
		observe(gridModel.dataChanged)
			.subscribe(e => {
				if (e.tag.source === 'column.chooser') {
					return;
				}

				if (e.hasChanges('columns')) {
					setup();
				}
			});

		observe(gridModel.columnListChanged)
			.subscribe(e => {
				if (e.tag.source === 'column.chooser') {
					return;
				}

				if (e.hasChanges('index')) {
					setup();
				}
			});
	}

	state(node) {
		const { children } = node;
		const { column } = node.value;
		if (children.length) {
			return children.some(n => n.value.column.isVisible);
		}

		return column.isVisible !== false;
	}

	stateAll() {
		return this.listView.every(c => c.isVisible);
	}

	stateDefault() {
		return this.listView.every(c => (c.isDefault !== false && c.isVisible !== false) || (c.isDefault === false && c.isVisible === false));
	}

	isIndeterminate() {
		return !this.stateAll() && this.listView.some(c => c.isVisible);
	}

	get canAggregate() {
		return this.columnChooserCanAggregate;
	}

	get resource() {
		return this.plugin.model.columnChooser().resource;
	}
}

class ColumnChooserState {
	constructor() {
		this.resource = new Resource();
		this.canAggregate = false;
		this.canSort = true;
	}
}

class ColumnFilterPlugin {
	constructor(plugin, context) {
		const { model } = plugin;

		this.plugin = plugin;
		this.column = context.column;

		this.cancelEvent = new Event();
		this.submitEvent = new Event();
		this.resetEvent = new Event();

		const filterBy = model.filter().by[this.column.key];

		this.by = new Set((filterBy && filterBy.items) || []);
		this.byBlanks = !!(filterBy && filterBy.blanks);

		let defaultOperator = model.filter().operatorFactory(this.column)[0] || 'contains';
		if (filterBy && filterBy.items && filterBy.items.length) {
			defaultOperator = 'contains';
		}

		this.items = [];
		this.operator = filterBy && filterBy.expression && filterBy.expression.op || defaultOperator;
		this.value = filterBy && filterBy.expression && filterBy.expression.right || null;
		this.title = this.column.title;
		this.getValue = getLabelFactory(this.column);

		Object.assign(this, this.commands);

		this.changeOperator.execute(this.operator);
	}

	state(item) {
		return this.by.has(item);
	}

	stateAll() {
		return this.items.every(this.state.bind(this)) && (!this.hasBlanks || this.byBlanks);
	}

	isIndeterminate() {
		return !this.stateAll() && (this.items.some(this.state.bind(this)) || this.byBlanks);
	}

	isEmpty() {
		return !!this.by.size || this.byBlanks;
	};

	get commands() {
		return {
			toggle: new Command({
				source: 'column.filter.view',
				execute: (item) => {
					if (this.by.has(item)) {
						this.by.delete(item);
					}
					else {
						this.by.add(item);
					}

					this.by = new Set(this.by);
				}
			}),
			toggleAll: new Command({
				source: 'column.filter.view',
				execute: search => {
					const state = !this.stateAll();
					if (state) {
						for (let item of this.items) {
							this.by.add(item);
						}
					}
					else {
						if (search) {
							for (let item of this.by) {
								if (this.items.indexOf(item) >= 0) {
									this.by.delete(item);
								}
							}
						}
						else {
							this.by.clear();
						}
					}

					this.by = new Set(this.by);
					this.byBlanks = this.hasBlanks && state;
				}
			}),

			changeOperator: new Command({
				source: 'column.filter.view',
				execute: (op) => {
					this.operator = op;

					let { value } = this;
					switch (op) {
						case 'between': {
							if (!Array.isArray(value)) {
								if (isUndefined(value)
									|| value === null
									|| value === '') {
									this.value = [];
								} else {
									this.value = [value];
								}
							}
							break;
						}
						default: {
							if (Array.isArray(value)) {
								this.value = value[0];
							}
							break;
						}
					}
				}
			}),

			submit: new Command({
				source: 'column.filter.view',
				execute: () => {
					const { model } = this.plugin;
					const by = clone(model.filter().by);

					const filter = by[this.column.key] || {};

					filter.items = Array.from(this.by);
					filter.blanks = this.byBlanks;

					if (this.operator === 'contains') {
						delete filter.expression;
					} else {
						filter.items = [];

						if (this.operator.startsWith('is')) {
							filter.expression = {
								kind: 'condition',
								op: this.operator,
								left: this.column.key,
								right: null,
							};
						}
						else if (
							isUndefined(this.value)
							|| this.value === null
							|| this.value === ''
							|| (isArray(this.value) && this.value.length === 0)) {
							delete filter.expression;
						} else {
							const parse = parseFactory(this.column.type, this.column.editorOptions.editor);
							filter.expression = {
								kind: 'condition',
								op: this.operator,
								left: this.column.key,
								right: isArray(this.value) ? this.value.map(parse) : parse(this.value),
							};
						}
					}

					if ((filter.items && filter.items.length) || filter.blanks || filter.expression) {
						by[this.column.key] = filter;
					}
					else {
						delete by[this.column.key];
					}

					model.filter({ by }, { source: 'column.filter.view' });

					this.submitEvent.emit();
				}
			}),

			cancel: new Command({
				source: 'column.filter.view',
				execute: () => this.cancelEvent.emit()
			}),

			reset: new Command({
				source: 'column.filter.view',
				execute: () => {
					this.by = new Set();
					this.byBlanks = false;
					this.value = this.operator === 'between' ? [] : null;
					this.resetEvent.emit();
				}
			}),
		};
	}
}

class ColumnFilterState {
	constructor() {
		this.threshold = 20;
		this.source = 'data';
	}
}

const GRID_ACTIVE_CLASS = `${GRID_PREFIX}-active`;
const GRID_HIDE_CLASS = `${GRID_PREFIX}-hide`;

class ColumnSortPlugin {
	constructor(plugin, context) {
		const { model, observeReply, view } = plugin;
		const { column, iconDesc, iconAsc, element } = context;

		this.element = element;

		observeReply(model.sortChanged)
			.subscribe(e => {
				if (e.hasChanges('by')) {
					if (view.sort.order(column) < 0) {
						Fastdom.mutate(() => {
							element.classList.add(GRID_HIDE_CLASS);
							element.classList.remove(GRID_ACTIVE_CLASS);

							iconAsc.classList.remove(GRID_ACTIVE_CLASS);
							iconDesc.classList.remove(GRID_ACTIVE_CLASS);
						});
					} else {
						const direction = view.sort.direction(column);
						const oldIcon = direction === 'asc' ? iconDesc : iconAsc;
						const newIcon = direction === 'asc' ? iconAsc : iconDesc;

						Fastdom.mutate(() => {
							element.classList.add(GRID_ACTIVE_CLASS);
							element.classList.remove(GRID_HIDE_CLASS);

							oldIcon.classList.remove(GRID_ACTIVE_CLASS);
							newIcon.classList.add(GRID_ACTIVE_CLASS);
						});
					}
				}
			});

		this.toggle = new Command({
			canExecute: () => view.sort.toggle.canExecute(column),
			execute: () => view.sort.toggle.execute(column)
		});
	}

	click() {
		if (this.toggle.canExecute()) {
			this.toggle.execute();
			return true;
		}

		return false;
	}

	mouseLeave() {
		Fastdom.mutate(() => {
			this.element.classList.remove(GRID_HIDE_CLASS);
		});
	}
}

class DataManipulationState {
	constructor() {
		this.resource = new Resource();

		this.deleted = new Set();
		this.added = new Set();
		this.edited = new Map();

		this.rowFactory = etalonRow => {
			if (etalonRow) {
				return cloneDeep(etalonRow, value => {
					if (isArray(value)) {
						return [];
					}

					if (!isObject(value) ||
						isNumber(value) ||
						isDate(value) ||
						isBoolean(value) ||
						isFunction(value)) {
						return null;
					}
				});
			}
		};
	}
}

class DataManipulationPlugin {
	constructor(plugin) {
		this.plugin = plugin;

		this.commitCommand = new Command({
			execute: e => {
				if (e.column.category !== 'data') {
					return;
				}

				const rowId = this.rowId(e.rowIndex, e.row);
				const columnId = this.columnId(e.columnIndex, e.column);
				const { edited } = this.changes;

				let entries = edited.get(rowId);
				if (!entries) {
					entries = [];
					edited.set(rowId, entries);
				}

				let entryIndex = entries.findIndex(entry => entry.column === columnId);
				let entry = entries[entryIndex];
				if (!entry) {
					entry = {
						column: columnId,
						oldValue: e.oldValue,
						oldLabel: e.oldLabel
					};

					entryIndex = entries.length;
					entries.push(entry);
				}

				entry.newValue = e.newValue;
				entry.newLabel = e.newLabel;

				// TODO: understand if we need to track label changes?
				if (!this.hasChanges(entry.newValue, entry.oldValue)) {
					entries.splice(entryIndex, 1);
					if (!entries.length) {
						edited.delete(rowId);
					}
				}
			}
		});

		this.actions = [
			new Action(
				new Command({
					source: 'data.manipulation',
					execute: () => {
						const { model, observe, table } = this.plugin;
						const { data } = model;

						const newRow = this.rowFactory(model.data().rows[0]);
						if (isUndefined(newRow)) {
							throw new GridError('data.manipulation', 'Setup rowFactory property to add new rows');
						}

						const rowId = this.rowId(0, newRow);
						this.changes.added.add(rowId);
						data({
							rows: [newRow].concat(data().rows)
						}, {
							source: 'data.manipulation'
						});

						observe(model.sceneChanged)
							.pipe(
								filter(e => e.hasChanges('status') && e.state.status === 'stop'),
								takeOnce()
							)
							.subscribe(e => {
								const index = model.view().rows.indexOf(newRow);
								model.focus({
									rowIndex: index
								}, {
									source: 'data.manipulation.plugin'
								});

								table.view.focus();
							});
					},
					shortcut: 'F7'
				}),
				'Add New Row',
				'add'
			)];

		this.rowActions = [
			new Action(
				new Command({
					source: 'data.manipulation',
					canExecute: e => {
						const rowId = this.rowId(e.rowIndex, e.row);
						return !this.changes.deleted.has(rowId);
					},
					execute: e => {
						const { model } = this.plugin;
						const { data } = model;

						const rowId = this.rowId(e.rowIndex, e.row);
						const changes = this.changes;
						if (changes.added.has(rowId)) {
							changes.added.delete(rowId);
							const rows = data().rows.filter((row, i) => this.rowId(i, row) !== rowId);
							data({ rows }, {
								source: 'data.manipulation'
							});
						}
						else {
							changes.deleted.add(rowId);
						}
					}
				}),
				'Delete Row',
				'delete'
			),
			new Action(
				new Command({
					source: 'data.manipulation',
					execute: e => {
						const rowId = this.rowId(e.rowIndex, e.row);
						if (this.changes.deleted.has(rowId)) {
							this.changes.deleted.delete(rowId);
						}

						if (this.changes.edited.has(rowId)) {
							try {
								const { model } = this.plugin;

								const edits = this.changes.edited.get(rowId);
								const columnMap = columnService.mapColumns(model.columnList().line);
								for (const edit of edits) {
									const column = columnMap[edit.column];
									if (!column) {
										throw new GridError('data.manipulation', `Column ${edit.column} is not found`);
									}

									setValue(e.row, column, edit.oldValue);
									setLabel(e.row, column, edit.oldLabel);
								}
							}
							finally {
								this.changes.edited.delete(rowId);
							}
						}
					},
					canExecute: e => {
						const rowId = this.rowId(e.rowIndex, e.row);
						return this.changes.deleted.has(rowId) || this.changes.edited.has(rowId);
					}
				}),
				'Revert Row',
				'restore'
			),
			// new Action(
			//	source: 'data.manipulation',
			// 	new Command({
			// 		execute: () => {
			// 			// TODO make edit form service
			// 		}
			// 	}),
			// 	'Edit Form',
			// 	'edit'
			// )
		];

		const { model, disposable, observeReply } = this.plugin;

		this.rowId = model.data().rowId;
		this.columnId = model.data().columnId;

		const dm = model.resolve(DataManipulationState);
		this.rowFactory = dm.state().rowFactory;

		const styleState = model.style();
		const rows = Array.from(styleState.rows);
		const cells = Array.from(styleState.cells);
		rows.push(this.styleRow.bind(this));
		cells.push(this.styleCell.bind(this));


		model
			.edit({
				mode: 'cell',
				commit: Composite.command([this.commitCommand, model.edit().commit])
			})
			.style({
				rows, cells
			})
			.action({
				items: Composite.list([this.actions, model.action().items])
			});

		disposable.add(() => {
			const { items } = model.action();
			const notDMActions = items.filter(x => this.actions.every(y => y.id !== x.id));
			model.action({ items: notDMActions });
		});

		observeReply(model.columnListChanged)
			.pipe(
				filter(e => e.hasChanges('line')),
				takeOnce()
			)
			.subscribe(e => {
				const rowOptionsColumn = e.state.line.find(column => column.type === 'row-options');
				if (rowOptionsColumn) {
					rowOptionsColumn.editorOptions.actions.push(...this.rowActions);
				}
			});
	}

	hasChanges(newValue, oldValue) {
		// TODO: understand if we need to parse values (e.g. '12' vs 12)
		return newValue !== oldValue;
	}

	styleRow(row, context) {
		const rowId = this.rowId(context.row, row);
		if (this.changes.deleted.has(rowId)) {
			context.class('deleted', { opacity: 0.3 });
		}
	}

	styleCell(row, column, context) {
		const rowId = this.rowId(context.row, row);
		const changes = this.changes;
		if (column.type === 'row-indicator') {
			if (changes.deleted.has(rowId)) {
				context.class('delete-indicator', { background: '#EF5350' });
			}
			else if (changes.added.has(rowId)) {
				context.class('add-indicator', { background: '#C8E6C9' });
			}
			else if (changes.edited.has(rowId)) {
				context.class('edit-indicator', { background: '#E3F2FD' });
			}

			return;
		}

		if (changes.edited.has(rowId)) {
			const entries = changes.edited.get(rowId);
			if (entries.findIndex(entry => entry.column === this.columnId(context.column, column)) >= 0) {
				context.class('edited', { background: '#E3F2FD' });
			}
		}
	}

	get changes() {
		const { model } = this.plugin;
		return model.dataManipulation();
	}

	get resource() {
		const dm = this.model.resolve(DataManipulationState);
		return dm.state().resource;
	}
}

class EditFormEditorPlugin {
	constructor(context) {
		this.editor = context.editor;
	}
}

class EditFormPanelPlugin {
	constructor(plugin, context) {
		const { model, disposable } = plugin;

		this.plugin = plugin;
		this.editor = new RowEditor(context.row, model.columnList().line);
		this.caption = context.caption;

		this.submitEvent = new Event();
		this.cancelEvent = new Event();
		this.resetEvent = new Event();

		this.submit = this.commands.submit;
		this.cancel = this.commands.cancel;
		this.reset = this.commands.reset;

		if (!isUndefined(context.shortcut)) {
			disposable.add(context.shortcut.register(new Map(
				Object.entries(this.commands)
			)));
		}
	}

	get editors() {
		return this.editor.editors;
	}

	get commands() {
		const commands = {
			submit: new Command({
				source: 'edit.form.panel',
				shortcut: this.shortcutFactory('commit'),
				execute: () => {
					this.editor.commit();
					this.submitEvent.emit();
				}
			}),
			cancel: new Command({
				source: 'edit.form.panel',
				shortcut: this.shortcutFactory('cancel'),
				execute: () => this.cancelEvent.emit()
			}),
			reset: new Command({
				source: 'edit.form.panel',
				execute: () => {
					this.editor.editors.forEach(e => e.reset());
					this.resetEvent.emit();
				}
			})
		};

		return commands;
	}

	shortcutFactory(type) {
		const { model } = this.plugin;
		return () => {
			const shortcuts = model.edit()[type + 'Shortcuts'];
			return shortcuts['reference'] || shortcuts['$default'];
		};
	}
}

class EditFormPlugin {
	constructor(model, context) {
		this.model = model;

		this.key = context.key;
		this.title = context.title;
		this.row = context.row;

		this.submitEvent = new Event();
		this.cancelEvent = new Event();

		this.submit = this.commands.submit;
		this.cancel = this.commands.cancel;
	}

	get commands() {
		const commands = {
			submit: new Command({
				source: 'edit.form',
				execute: () => this.submitEvent.emit()
			}),
			cancel: new Command({
				source: 'edit.form',
				execute: () => this.cancelEvent.emit()
			})
		};

		return commands;
	}
}

function downloadFactory(fileSaver) {
	return function download(name, data, mimeType, extension) {
		const blob = new Blob([data], {type: mimeType});
		const type = extension ? extension : mimeType.split('/')[1];
		const fileName = `${name}.${type}`;
		fileSaver.saveAs(blob, fileName);
	};
}

class PdfWriter {
	constructor(jsPDF) {
		this.jsPDF = jsPDF;
	}
	write(rows, columns, name) {
		const jsPDF = this.jsPDF;
		const titles = [];
		const values = [];
		const doc = new jsPDF({orientation: 'landscape', unit: 'in'});
		const tableOptions = {
			styles: {
				overflow: 'linebreak',
				fontSize: 8,
				columnWidth: 'auto',
				overflowColumns: true
			},
			headerStyles: {
				overflow: 'ellipsize',
			},
			pageBreak: 'auto',
			margin: 0
		};
		for (let column of columns) {
			titles.push({title: column.title, dataKey: column.path});
		}
		for (let row of rows) {
			values.push(graphFlatView(row));
		}

		doc.autoTable(titles, values, tableOptions);
		doc.save(`${name}.pdf`);
	}
}

function sheet_to_workbook(sheet) {
	const sheets = {};
	sheets['Sheet1'] = sheet;
	return {SheetNames: ['Sheet1'], Sheets: sheets};
}

function toArrayBuffer(excel) {
	const buffer = new ArrayBuffer(excel.length);
	const view = new Uint8Array(buffer);
	for (let i = 0; i < excel.length; ++i) {
		view[i] = excel.charCodeAt(i) & 0xFF;
	}
	return buffer;
}

class XlsxWriter {
	constructor(xlsx) {
		this.xlsx = xlsx;
	}
	write(rows, columns) {
		const result = [];
		const headers = [];
		const excelOptions = {bookType: 'xlsx', bookSST: true, cellDates: true, compression: true, type: 'binary'};

		for (let row of rows) {
			result.push(graphFlatView(row));
		}
		for (let column of columns) {
			headers.push(column.title);
		}
		const worksheet = this.xlsx.utils.json_to_sheet(result);
		const workbook = sheet_to_workbook(this.updateTitles(worksheet, headers));
		const excel = this.xlsx.write(workbook, excelOptions);

		return toArrayBuffer(excel);
	}

	updateTitles(worksheet, headers) {
		const range = this.xlsx.utils.decode_range(worksheet['!ref']);
		for (let i = range.s.r; i <= range.e.r; ++i) {
			const address = this.xlsx.utils.encode_col(i) + '1';
			if (!worksheet[address]) continue;
			worksheet[address].v = headers[i];
		}
		return worksheet;
	}
}

class ExportPlugin {
	constructor(model, type) {
		this.model = model;
		this.type = type;

		this.csv = new Command({
			source: 'export',
			canExecute: () => this.type === 'csv',
			execute: () => {
				const pluginService = new PluginService(this.model);
				const fileSaver = pluginService.resolve('fileSaver');
				const csv = new CsvExport();
				const data = csv.write(this.rows, this.columns);
				const download = downloadFactory(fileSaver);
				download(this.id, data, `text/${this.type}`);
			}
		});

		this.json = new Command({
			source: 'export',
			canExecute: () => this.type === 'json',
			execute: () => {
				const pluginService = new PluginService(this.model);
				const fileSaver = pluginService.resolve('fileSaver');
				const json = new JsonExport();
				const data = json.write(this.rows, this.columns);
				const download = downloadFactory(fileSaver);
				download(this.id, data, `text/${this.type}`);
			}
		});

		this.xml = new Command({
			source: 'export',
			canExecute: () => this.type === 'xml',
			execute: () => {
				const pluginService = new PluginService(this.model);
				const fileSaver = pluginService.resolve('fileSaver');
				const xml = new XmlExport();
				const data = xml.write(this.rows);
				const download = downloadFactory(fileSaver);
				download(this.id, data, `application/${this.type}`);
			}
		});

		this.xlsx = new Command({
			source: 'export',
			canExecute: () => this.type === 'xlsx',
			execute: () => {
				const pluginService = new PluginService(this.model);
				const lib = pluginService.resolve('xlsx');
				const fileSaver = pluginService.resolve('fileSaver');
				const xlsx = new XlsxWriter(lib);
				const data = xlsx.write(this.rows, this.columns);
				const download = downloadFactory(fileSaver);
				download(this.id, data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx');
			}
		});

		this.pdf = new Command({
			source: 'export',
			canExecute: () => this.type === 'pdf',
			execute: () => {
				const pluginService = new PluginService(this.model);
				const lib = pluginService.resolve('pdf');
				const pdf = new PdfWriter(lib);
				pdf.write(this.rows, this.columns, this.id);
			}
		});
	}

	get columns() {
		return this.model.columnList().line;
	}

	get rows() {
		return this.model.data().rows;
	}

	get id() {
		return this.model.grid().id;
	}
}

class FocusPlugin {
	constructor(context) {
		this.element = context.element;
		this.targetSelector = context.targetSelector;
		this.job = jobLine(context.delay);
	}

	set() {
		if (this.element.getAttribute('tabindex') === null
			|| this.element.getAttribute('tabindex') !== '') {
			this.element.setAttribute('tabindex', -1);
		}

		this.job(() => {
			let targetElement = this.element;
			if (this.targetSelector) {
				const target = this.element.querySelector(this.targetSelector);
				if (target) {
					targetElement = target;
				}
				else {
					throw new GridError('focus', `Element "${this.targetSelector}" is not found`);
				}
			}

			targetElement.focus();
		});
	}
}

function rewriteObject(obj) {
	const result = {};
	for (let [key, value] of Object.entries(obj)) {
		result[key] = value;
	}
	return result;
}

class XlsxReader {
	constructor(xlsx) {
		this.xlsx = xlsx;
	}
	read(data, options) {

		const workbook = this.xlsx.read(data, {type: 'binary'});
		return this.toJson(workbook, options);
	}

	toJson(workbook, options = {}) {
		const wbOptions = {};
		switch (options.head) {
			case 'alpha': {
				wbOptions.header = 'A';
				break;
			}
			case 'numeric': {
				wbOptions.header = 1;
				break;
			}
		}
		let result = [];
		for (let sheetName of workbook.SheetNames) {
			const partial = this.xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], wbOptions);
			result = partial.concat(result);
		}

		return result.map(rewriteObject);
	}
}

function getType(name) {
	const delimiter = /[.]/g.test(name);
	if (delimiter) {
		const type = name.split('.');
		return type[type.length - 1];
	}
}

function readFile(e, file, model, options = {}) {
	const data = e.target.result;
	const type = file.type === '' ? getType(file.name) : file.type;
	const pluginService = new PluginService(model);
	switch (type) {
		case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
		case 'xlsx': {
			const lib = pluginService.resolve('xlsx');
			const xlsx = new XlsxReader(lib);
			const rows = xlsx.read(data, options);
			const createColumn = columnFactory(model);
			const columns = generate({
				rows,
				columnFactory: (type, body) => createColumn('text', body),
				deep: false
			});
			model.data({
				columns,
				rows
			}, { source: 'read' });
			break;
		}
		case 'application/json':
		case 'text/json':
		case 'json': {
			const json = new JsonImport();
			const rows = json.read(data);
			if (rows.length) {
				const createColumn = columnFactory(model);
				const columns = generate({
					rows,
					columnFactory: (type, body) => createColumn('text', body),
					deep: true
				});
				model.data({
					columns,
					rows
				}, { source: 'read' });
			} else {
				throw new GridError('import', 'JSON for input should be an array of objects');
			}
			break;
		}
		case 'application/xml':
		case 'text/xml':
		case 'xml': {
			const xml = new XmlImport();
			const rows = xml.read(data);
			const columns = generate({
				rows,
				columnFactory: columnFactory(model),
				deep: true
			});
			model.data({
				columns,
				rows
			}, { source: 'read' });
			break;
		}
		case 'application/vnd.ms-excel':
		case 'text/csv':
		case 'csv': {
			const csv = new CsvImport();
			const rows = csv.read(data);

			let title = firstRowTitle;

			if (options.head === 'alpha') {
				title = alphaTitle;
			} else if (options.head === 'numeric') {
				title = numericTitle;
			}

			const columns = generate({
				rows,
				columnFactory: columnFactory(model),
				deep: false,
				title
			});

			if (title === firstRowTitle) {
				rows.shift(0);
			}
			model.data({
				columns,
				rows
			}, { source: 'read' });
			break;
		}
		default: {
			throw new GridError('import', `This is not valid file type ${type}`);
		}
	}
}

class ImportPlugin {
	constructor(model, element) {
		this.model = model;
		this.element = element;
	}

	upload() {
		upload(this.element);
	}

	load(e) {
		const { files } = e.target;
		for (let file of files) {
			const reader = new FileReader();
			reader.onload = e => readFile(e, file, this.model, this.options);
			reader.readAsBinaryString(file);
		}
	}
}

class PagerPlugin {
	constructor(plugin) {
		const { model } = plugin;

		this.plugin = plugin;

		const { shortcut } = model.pagination();

		this.next = new Command({
			source: 'pager',
			shortcut: shortcut.next,
			execute: () => {
				new FocusAfterRenderService(plugin);
				model.pagination({ current: model.pagination().current + 1 }, { source: 'pager.view' });
			},
			canExecute: () => (model.pagination().current + 1) * model.pagination().size < model.pagination().count
		});

		this.prev = new Command({
			source: 'pager',
			shortcut: shortcut.prev,
			execute: () => {
				new FocusAfterRenderService(plugin);
				model.pagination({ current: model.pagination().current - 1 }, { source: 'pager.view' });
			},
			canExecute: () => model.pagination().current > 0
		});
	}

	get theme() {
		return this.plugin.model.style().classList
	}

	get resource() {
		return this.plugin.model.pagination().resource;
	}

	get size() {
		return this.plugin.model.pagination().size;
	}

	set size(value) {
		this.plugin.model.pagination({ size: value, current: 0 }, { source: 'pager.view' });
	}

	get sizeList() {
		return this.plugin.model.pagination().sizeList;
	}

	get current() {
		return this.plugin.model.pagination().current;
	}

	set current(value) {
		return this.plugin.model.pagination({ current: value }, { source: 'pager.view' });
	}

	get from() {
		return Math.min(this.total, this.current * this.size + 1);
	}

	get to() {
		return Math.min(this.total, (this.current + 1) * this.size);
	}

	get total() {
		return this.plugin.model.pagination().count;
	}

	get totalPages() {
		return this.size === 0
			? 0
			: Math.max(1, Math.ceil(this.total / this.size));
	}

	get scroll() {
		return this.plugin.model.scroll();
	}

	get mode() {
		return this.plugin.model.pagination().mode;
	}
}

class PersistencePlugin {
	constructor(plugin, createDefaultModel) {
		const { model, observeReply } = plugin;

		this.plugin = plugin;
		this.service = new PersistenceService(model, createDefaultModel);
		this.closeEvent = new Event();
		this.items = [];
		this.state = {
			editItem: null,
			oldValue: null
		};

		const { persistence } = model;

		this.id = persistence().id;
		this.title = this.stringify();

		persistence()
			.storage
			.getItem(this.id)
			.then(items => {
				this.items = items || [];
				this.groups = this.buildGroups(this.items);
			});

		observeReply(model.gridChanged)
			.subscribe(e => {
				if (e.hasChanges('status') && e.state.status === 'unbound') {
					this.closeEvent.emit();
				}
			});

		this.create = new Command({
			source: 'persistence.view',
			execute: () => {
				const item = {
					title: this.title,
					modified: Date.now(),
					model: this.service.save(),
					isDefault: false,
					group: persistence().defaultGroup,
					canEdit: true
				};

				if (persistence().create.execute(item) !== false) {
					this.items.push(item);
					this.persist();
					this.title = '';
					return true;
				}
				return false;
			},
			canExecute: () => {
				if (!!this.title && this.isUniqueTitle(this.title)) {
					const item = {
						title: this.title,
						modified: Date.now(),
						model: this.service.save(),
						isDefault: false,
						group: persistence().defaultGroup,
						canEdit: true
					};

					return persistence().create.canExecute(item);
				}

				return false;
			}
		});

		this.edit = {
			enter: new Command({
				source: 'persistence.view',
				execute: item => {
					item = item || this.items.find(this.isActive);
					if (!item) {
						return false;
					}
					this.state = {
						editItem: item,
						oldValue: clone(item)
					};
					return true;
				},
				canExecute: item => this.state.editItem === null && item.canEdit
			}),
			commit: new Command({
				source: 'persistence.view',
				shortcut: 'enter',
				execute: item => {
					item = item || this.state.editItem;
					if (persistence().modify.execute(item) !== false) {
						const title = item.title;
						if (!title || !this.isUniqueTitle(title)) {
							this.edit.cancel.execute();
							return false;
						}
						item.modified = Date.now();
						this.persist();
						this.state.editItem = null;
						return true;
					}
					return false;
				},
				canExecute: () =>
					this.state.editItem !== null &&
					persistence().modify.canExecute(this.state.editItem)
			}),
			cancel: new Command({
				source: 'persistence.view',
				shortcut: 'escape',
				execute: () => {
					if (this.state.editItem !== null) {
						const index = this.items.indexOf(this.state.editItem);
						this.items.splice(index, 1, this.state.oldValue);
						this.state.oldValue = null;
						this.state.editItem = null;
					} else {
						this.closeEvent.emit();
					}
					return true;
				}
			})
		};

		this.load = new Command({
			source: 'persistence.view',
			canExecute: item => persistence().load.canExecute(item),
			execute: item => {
				if (persistence().load.execute(item) !== false) {
					this.service.load(item.model);
					return true;
				}

				return false;
			}
		});

		this.reset = new Command({
			source: 'persistence.view',
			execute: () => {
				if (persistence().reset.execute() !== false) {
					this.service.reset();
				}
				return false;
			},
			canExecute: () => persistence().reset.canExecute()
		});

		this.remove = new Command({
			source: 'persistence.view',
			execute: item => {
				const index = this.items.indexOf(item);
				if (index >= 0) {
					if (persistence().remove.execute(item) !== false) {
						this.items.splice(index, 1);

						this.persist();
						return true;
					}
				}
				return false;
			},
			canExecute: item =>
				item.canEdit && persistence().remove.canExecute(item)
		});

		this.setDefault = new Command({
			source: 'persistence.view',
			canExecute: item => persistence().setDefault.canExecute(item),
			execute: item => {
				if (persistence().setDefault.execute(item) !== false) {
					const index = this.items.indexOf(item);
					if (index === -1) {
						return false;
					}

					if (item.isDefault) {
						item.isDefault = false;
					} else {
						this.items.forEach(i => (i.isDefault = false));
						item.isDefault = true;
					}
					this.items.splice(index, 1, item);

					this.persist();
					return true;
				}

				return false;
			}
		});

		const commandManager = new CommandManager();
		const shortcut = new Shortcut(new ShortcutDispatcher());

		this.keyDown = e => shortcut.keyDown(e);

		shortcut.register(commandManager, [
			this.edit.enter,
			this.edit.commit,
			this.edit.cancel
		]);
	}

	get blank() {
		return {
			title: 'Blank',
			modified: Date.now(),
			model: {},
			isDefault: false,
			group: 'blank',
			canEdit: false
		};
	}

	get sortedItems() {
		return this.items.sort((a, b) => b.modified - a.modified);
	}

	buildGroups(items) {
		return items
			.reduce((memo, item) => {
				const group = memo.find(m => m.key === item.group);
				if (group) {
					group.items.push(item);
				} else {
					memo.push({
						key: item.group,
						items: [item]
					});
				}
				return memo;
			}, []);
	}

	isActive(item) {
		return serialize(item.model) === serialize(this.service.save()); // eslint-disable-line angular/json-functions
	}

	persist() {
		const { model } = this.plugin;

		model
			.persistence()
			.storage
			.setItem(this.id, this.items.filter(item => item.canEdit));

		this.groups = this.buildGroups(this.items);
	}

	stringify(item) {
		const { settings } = this.plugin.model.persistence();
		const model = item ? item.model : this.service.save();
		const targets = [];

		for (let key in settings) {
			if (!model[key]) {
				continue;
			}

			const stringify = stringifyFactory(key);
			const target = stringify(model[key]);
			if (target !== '') {
				targets.push(target);
			}
		}

		return targets.join('; ') || 'No settings';
	}

	isUniqueTitle(title) {
		title = (title || '').trim().toLowerCase();
		return !this.items
			.some(item =>
				item !== this.state.editItem &&
				(item.title || '').toLowerCase() === title
			);
	}
}

class PositionPlugin {
	constructor(context, disposable) {
		this.element = context.element;
		this.targetName = context.targetName;

		const windowListener = new EventListener(window, new EventManager(this));
		const job = jobLine(400);

		disposable.add(
			windowListener.on('resize', () => {
				this.invalidate();
				// In case if after window resize there can different animated layout changes
				job(() => this.invalidate());
			}));
	}

	invalidate() {
		let node = this.element.parentNode;
		while (node) {
			const targetName = (this.targetName || '').toLowerCase();
			if (node.nodeName.toLowerCase() === targetName) {
				// To gurantee last execution we cover mutate with measure
				Fastdom.measure(() =>
					Fastdom.mutate(() => {
						this.layout(node, this.element);
						this.element.style.opacity = 1;
					})
				);
				return;
			}
			node = node.parentNode;
		}
	}

	layout(target, source) {
		const { top, right, left, bottom } = target.getBoundingClientRect();
		const { width, height } = source.getBoundingClientRect();

		const fitRect = this.boxRect();
		const intersections = [];

		intersections.push(
			this.intersection(fitRect, {
				top: top,
				right: left + width,
				bottom: top + height,
				left: left
			}));

		intersections.push(
			this.intersection(fitRect, {
				top: top,
				right: right,
				bottom: top + height,
				left: right - width
			}));

		intersections.push(
			this.intersection(fitRect, {
				top: bottom - height,
				right: left + width,
				bottom: bottom,
				left: left
			}));

		intersections.push(
			this.intersection(fitRect, {
				top: bottom - height,
				right: right,
				bottom: bottom,
				left: right - width
			}));

		const intersection = max(intersections, i => i.area);
		const { left: l, top: t } = intersection.b;
		const pos = this.fix({ left: l - fitRect.left, top: t - fitRect.top, width, height });

		source.style.left = pos.left + 'px';
		source.style.top = pos.top + 'px';
	}

	intersection(a, b) {
		const xo = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
		const yo = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
		const area = xo * yo;
		return { area, a, b };
	}

	fix(rect) {
		const wr = this.windowRect();
		const br = this.boxRect();

		const { width: ww, height: wh } = wr;
		const abx = br.left - wr.left;
		const aby = br.top - wr.top;

		const { height: rh, width: rw } = rect;
		//  absolute coords relative to window
		const arx = rect.left + abx;
		const ary = rect.top + aby;

		const ltx0 = arx < wr.left;
		const gtx1 = arx + rw > ww;
		const lty0 = ary < wr.top;
		const gty1 = ary + rh > wh;

		// we are trying to show right bottom corner
		// it often has control buttons
		const left = ltx0 || gtx1
			? rect.left + (ww - arx - rw)
			: rect.left;

		const top = lty0 || gty1
			? rect.top + (wh - ary - rh)
			: rect.top;

		return { left, top };
	}

	boxRect() {
		let view = this.element;
		const marker = `${GRID_PREFIX}-box`;
		while (view) {
			if (view.classList && view.classList.contains(marker)) {
				return view.getBoundingClientRect();
			}

			view = view.parentNode;
		}

		return this.windowRect();
	}

	windowRect() {
		const { innerHeight: h, innerWidth: w } = window;
		return {
			top: 0,
			left: 0,
			bottom: h,
			right: w,
			height: h,
			width: w
		};
	}
}

class RestPlugin {
	constructor(model, { get, post }) {
		this.model = model;

		const { method, url, serialize } = this.model.rest();
		if (!url) {
			throw new GridError('rest', 'REST endpoint URL is required');
		}

		const fetch = this.fetchFactory(method, get, post);
		const doSerialize = this.serializeFactory(method, serialize);

		model.data({
			pipe: [
				(data, context, next) => {
					fetch(url, doSerialize(model)).then(data => next(data));
				},
				...PipeUnit.view
			]
		}, { source: 'rest.view' });
	}

	fetchFactory(method, get, post) {
		switch (method.toLowerCase()) {
			case 'get':
				return get;
			case 'post':
				return post;
			default:
				throw new GridError('rest', `"${method}" is incorrect REST method`);
		}
	}

	serializeFactory(method, serialize) {
		if (isFunction(serialize)) {
			return serialize;
		} else if (method === 'get') {
			return serializeGet;
		} else if (method === 'post') {
			return serializePost;
		}
	}
}

class ValidatorPlugin {
	constructor(model, context) {
		this.model = model;
		this.context = context;

		this.oldErrors = [];
		if (hasRules(this.rules, this.key)) {
			this.validator = createValidator(this.rules, this.key);
		}
	}

	get errors() {
		if (this.validator) {
			const target = {
				[this.key]: this.value
			};

			const isValid = this.validator.validate(target);
			if (!isValid) {
				const newError = this.validator.getErrors()[this.key];
				const newErrors = isString(newError) ? [newError] : newError;
				if (!same(newErrors, this.oldErrors)) {
					this.oldErrors = newErrors;
				}
			} else {
				this.oldErrors.length = 0;
			}

			return this.stringify(this.oldErrors);
		}
	}

	get rules() {
		return this.model.validation().rules;
	}

	get type() {
		return this.context.type;
	}

	get value() {
		return this.context.value;
	}

	get key() {
		return this.context.key;
	}

	stringify(errors) {
		const customErrors = [];
		let rules = {};
		for (const rule of this.validator.livrRules[this.key]) {
			rules = Object.assign(rules, rule);
		}

		for (const error of errors) {
			switch (error) {
				case 'REQUIRED': { customErrors.push(`Can't be empty`); break; }
				case 'FORMAT_ERROR': { customErrors.push('Wrong format'); break; }
				case 'TOO_LOW': { customErrors.push(`Must be > ${rules.min_number}`); break; }
				case 'TOO_HIGH': { customErrors.push(`Must be < ${rules.max_number}`); break; }
				case 'CANNOT BE EMPTY': { customErrors.push(`Can't be empty`); break; }
				case 'WRONG_FORMAT': { customErrors.push('Must match the pattern'); break; }
				case 'WRONG_EMAIL': { customErrors.push('Must be an email'); break; }
				case 'WRONG_URL': { customErrors.push('Must be a url'); break; }
				case 'WRONG_DATE': { customErrors.push('Must be a date'); break; }
				case 'FIELDS_NOT_EQUAL': { customErrors.push(`Field must be equal ${rules.equal_to_field}`); break; }
				case 'NOT_INTEGER': { customErrors.push('Must be an integer'); break; }
				case 'NOT_POSITIVE_INTEGER': { customErrors.push('Must be a positive integer'); break; }
				case 'NOT_DECIMAL': { customErrors.push('Must be a decimal'); break; }
				case 'NOT_POSITIVE_DECIMAL': { customErrors.push('Must be a positive decimal'); break; }
				case 'NOT_ALLOWED_VALUE': {
					if (rules.eq && rules.eq != this.value) {
						customErrors.push(`Must be equal to ${rules.eq}`);
					}
					else {
						customErrors.push(`Must be one of ${rules.one_of}`);
					}
					break;
				}
				case 'TOO_LONG': {
					if (rules.max_length && rules.max_length < this.value.length) {
						customErrors.push(`Length must be < ${rules.max_length}`);
					}
					else if (rules.length_equal && rules.length_equal != this.value.length) {
						customErrors.push(`Length must be equal to ${rules.length_equal}`);
					}
					else {
						customErrors.push(`Length must be [${rules.length_between['0']},${rules.length_between['1']}]`);
					}
					break;
				}
				case 'TOO_SHORT': {
					if (rules.min_length && rules.min_length > this.value.length) {
						customErrors.push(`Length must be > ${rules.min_length}`);
					}
					else if (rules.length_equal && rules.length_equal != this.value.length) {
						customErrors.push(`Length must be equal to ${rules.length_equal}`);
					}
					else {
						customErrors.push(`Length must be [${rules.length_between['0']},${rules.length_between['1']}]`);
					}
					break;
				}
				default: customErrors.push(error);
			}
		}

		return customErrors;
	}
}

export { AutofocusPlugin, BackdropPlugin, ColumnChooserPlugin, ColumnChooserState, ColumnFilterPlugin, ColumnFilterState, ColumnSortPlugin, DataManipulationPlugin, DataManipulationState, EditFormEditorPlugin, EditFormPanelPlugin, EditFormPlugin, ExportPlugin, FocusPlugin, ImportPlugin, PagerPlugin, PdfWriter, PersistencePlugin, PositionPlugin, RestPlugin, ValidatorPlugin, XlsxReader, XlsxWriter, downloadFactory, readFile };
