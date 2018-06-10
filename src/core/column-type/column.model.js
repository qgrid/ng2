import { identity, compare } from '../utility/kit';
import { Command } from '../command/command';
import { TemplatePath } from '../template/template.path';

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
		this.pin = null;
		this.origin = 'specific';
		this.source = 'user';
		this.class = 'data';
		this.editor = null;
		this.editorOptions = {
			modelFactory: () => new Model(),
			trigger: 'click', // click | custom | focus
			cruise: 'control', // control | transparent
			label: null,
			value: identity,
			actions: []
		};

		this.width = null;
		this.minWidth = 20;
		this.maxWidth = null;
		this.viewWidth = null;

		this.widthMode = 'relative'; // relative | absolute

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
	}

	toString() {
		return `${this.type}: ${this.title}`;
	}
}