import {View} from '../view';
import {Command} from '../infrastructure';
import {flatView, toggleStatus} from './row.details.service';
import {RowDetails} from './row.details';

export class RowDetailsView extends View {
	constructor(model, table) {
		super(model);

		this.toggleStatus = new Command({
			execute: row => {
				const status = toggleStatus([row], model.row().status, model.row().mode);

				model.row({
					status: status
				}, {
					source: 'row.details.view',
					behavior: 'core'
				});

				model.view({
					rows: flatView(table),
				}, {
					source: 'row.details.view',
					behavior: 'core'
				});
			}
		});

		model.viewChanged.watch(e => {
			if (e.tag.source !== 'row.details.view') {
				model.row({
					status: toggleStatus([], model.row().status)
				}, {
					source: 'row.details.view',
					behavior: 'core'
				});
			}
		});
	}

	status(row) {
		if (row instanceof RowDetails) {
			return null;
		}

		const status = this.model.row().status;
		const state = status.get(row);
		return state && state.expand ? 'expand' : 'collapse';
	}
}