import { ColumnView } from '../scene/view/column.view';
import { ColumnModel } from './column.model';
import { TemplatePath } from '../template/template.path';

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
		this.category = 'markup';

		this.title = '';
		this.canEdit = false;
		this.canSort = false;
		this.canResize = false;
		this.canHighlight = false;
		this.canFocus = false;
		this.canMove = false;
		this.canFilter = false;		
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