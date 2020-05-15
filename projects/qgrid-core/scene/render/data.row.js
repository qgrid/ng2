import { set as setValue } from '../../services/value';
import { set as setLabel } from '../../services/label';
import { isUndefined } from '../../utility/kit';

function defaultGetValue(row, column, select) {
	return select(row, column);
}

// This class is not inheritable, but construct in a way to use it as a composition without binding to `this`.
export class DataRow {
	constructor(plugin) {
		const { model, observeReply } = plugin;
		let area = {};
		let line = [];

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('column')) {
					area = e.state.column.area;
					line = e.state.column.line;
				}
			});

		this.getValue = defaultGetValue;
		this.getLabel = defaultGetValue;
		this.setValue = setValue;
		this.setLabel = setLabel;

		this.colspan = (row, column) => column.colspan;
		this.rowspan = () => 1;

		const columnList = (pin = 'mid') => area[pin] || [];

		this.columnList = columnList;
		this.columns = (row, pin) => columnList(pin);
	}
}
