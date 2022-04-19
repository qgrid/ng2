import { TemplatePath } from '../template/template.path';
import { compare, identity } from '../utility/kit';

TemplatePath.register('custom-cell', (template, column) => {
	return {
		model: template.for,
		resource: column.key
	};
});

TemplatePath.register('custom-cell-edit', (template, column) => {
	return {
		model: 'edit',
		resource: column.key
	};
});

export class ColumnModel {
	constructor(type = 'text') {
		this.key = null;
		this.path = null;
		this.labelPath = null;

		this.type = type;
		this.title = null;
		this.description = null;
		this.pin = 'mid';
		this.origin = 'specific';
		this.source = 'user';
		this.category = 'data';
		this.class = null;
		this.editor = null;
		this.editorOptions = {
			modelFactory: ({ createDefaultModel }) => createDefaultModel(),
			trigger: 'click', // click | custom | focus
			cruise: 'control', // control | transparent
			label: null,
			value: identity,
			actions: []
		};

		this.width = null;
		this.minWidth = null;
		this.maxWidth = null;
		this.viewWidth = null;

		this.widthMode = 'relative'; // relative | absolute | fit-head

		this.canEdit = true;
		this.canResize = true;
		this.canSort = true;
		this.canMove = true;
		this.canFilter = true;
		this.canHighlight = true;
		this.canFocus = true;

		this.isVisible = true;
		this.index = -1;

		this.value = null;
		this.label = null;

		this.compare = compare;

		this.children = [];

		this.$label = null;
		this.$value = null;

		this.itemLabel = identity;

		this.startNumber = 1;
	}

	toString() {
		return `${this.type}: ${this.title}`;
	}
}
