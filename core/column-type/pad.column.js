import {ColumnView} from '../scene/view';
import {ColumnModel} from './column.model';
import {TemplatePath} from '../template';

TemplatePath.register('pad-cell', (template) => {
	return {
		model: template.for,
		resource: `${template.for}.${template.type}`
	};
});

export class PadColumnModel extends ColumnModel {
	constructor() {
		super('pad');

		this.key = '$pad';
		this.class = 'markup';

		this.title = '';
		this.canEdit = false;
		this.canSort = false;
		this.canResize = false;
		this.canHighlight = false;
		this.canFocus = false;
		this.source = 'generation';
	}
}

export class PadColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? PadColumn.assign(model) : new PadColumnModel();
	}
}