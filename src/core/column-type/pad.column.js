import ColumnView from 'core/column-type/column.model.view';
import TemplatePath from 'core/template/template.path';
import ColumnModel from './column.model';

TemplatePath.register('pad-cell', (template) => {
	return {
		model: template.for,
		resource: `${template.for}.${template.type}`
	};
});

class PadColumnModel extends ColumnModel {
	constructor() {
		super('pad');

		this.key = '$pad';
		this.title = '';
		this.canEdit = false;
		this.canSort = false;
		this.canResize = false;
		this.canHighlight = false;
		this.canFocus = false;
		this.source = 'generation';
	}
}

export default class PadColumn extends ColumnView {
	constructor(model) {
		super(model);
	}

	static model(model) {
		return model ? PadColumn.assign(model) : new PadColumnModel();
	}
}