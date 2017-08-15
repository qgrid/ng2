import {View} from '../view';
import {PipeUnit} from '../pipe/units';

export class ColumnView extends View {
	constructor(model, service) {
		super(model);

		model.dataChanged.watch(e => {
			if (e.tag.behavior === 'core' || e.tag.source === 'column.view') {
				return;
			}

			if (e.hasChanges('columns') || e.hasChanges('rows')) {
				service.invalidate('column.view', e.changes, PipeUnit.column);
			}
		});

		this.using(model.columnListChanged.watch(e => {
			if (e.hasChanges('columns') || e.hasChanges('generation')) {
				service.invalidate('column.view', e.changes, PipeUnit.column);
			}
		}));

		this.using(model.filterChanged.watch(e => {
			if (e.hasChanges('unit')) {
				service.invalidate('column.view', e.changes, PipeUnit.column);
			}
		}));
	}
}