import * as columnService from '../column/column.service';
import { Fastdom } from '../services/fastdom';
import { LAYOUT_COLUMNS_ISSUE_COMMAND_KEY, STYLE_COLUMNS_WRITE_COMMAND_KEY } from '../command-bag/command.bag';

export class LayoutLet {
	constructor(plugin) {
		const { model, observeReply, disposable, commandPalette } = plugin;
		const styleRow = this.styleRow.bind(this);

		const layoutColumnsIssue = commandPalette.get(LAYOUT_COLUMNS_ISSUE_COMMAND_KEY);
		const styleColumnsWrite = commandPalette.get(STYLE_COLUMNS_WRITE_COMMAND_KEY);

		this.plugin = plugin;

		observeReply(model.navigationChanged)
			.subscribe(e => {
				if (e.hasChanges('cell')) {
					const { oldValue, newValue } = e.changes.cell;
					const oldColumn = oldValue ? oldValue.column : {};
					const newColumn = newValue ? newValue.column : {};

					if (oldColumn.key !== newColumn.key && (oldColumn.viewWidth || newColumn.viewWidth)) {
						Fastdom.measure(() => {
							const form = layoutColumnsIssue.execute();
							Fastdom.mutate(() => styleColumnsWrite.execute(form));
						});
					}
				}
			});

		observeReply(model.layoutChanged)
			.subscribe(e => {
				if (e.tag.source === 'layout.let') {
					return;
				}

				if (e.hasChanges('columns')) {
					Fastdom.measure(() => {
						const form = layoutColumnsIssue.execute();
						Fastdom.mutate(() => styleColumnsWrite.execute(form));
					});
				}
			});

		observeReply(model.rowChanged)
			.subscribe(e => {
				if (e.hasChanges('canResize')) {
					const rows = Array.from(model.style().rows);
					if (e.state.canResize) {
						rows.push(styleRow);
					}
					else {
						const index = model.style().rows.indexOf(styleRow);
						rows.splice(index, 1);
					}

					model.style({ rows }, { source: 'layout.let' });
				}
			});

		observeReply(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('columns')) {
					model.layout({
						columns: new Map()
					}, {
						source: 'layout.let',
						behavior: 'core'
					});
				}
			});

		observeReply(model.viewChanged)
			.subscribe(e => {
				if (e.hasChanges('columns')) {
					const columns = columnService.flatten(e.state.columns);
					const hasNotDefaultWidth = x => x.width !== null || x.minWidth !== null || x.maxWidth !== null;
					if (columns.some(hasNotDefaultWidth)) {
						Fastdom.mutate(() => {
							const { columns } = model.layout();
							styleColumnsWrite.execute(columns);
						});
					}
				}
			});
	}

	styleRow(row, context) {
		const { model } = this.plugin;
		const { layout } = model;

		const form = layout().rows;
		const style = form.get(row);
		if (style) {
			context.class(`resized-${style.height}px`, { height: style.height + 'px' });
		}
	}

	get gridId() {
		return this.plugin.model.grid().id;
	}
}