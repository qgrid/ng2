import {identity} from '../utility';
import {Command} from '../command';
import {TemplatePath} from '../template';

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
		this.type = type;
		this.key = null;
		this.title = null;
		this.value = null;
		this.label = null;
		this.path = null;
		this.pin = null;
		this.origin = 'specific';
		this.source = 'user';
		this.class = 'data';
		this.editor = null;
		this.editorOptions = {
			trigger: 'click',
			label: null,
			value: identity,
			commit: new Command(),
			cancel: new Command(),
			actions: []
		};

		this.width = null;
		this.minWidth = 20;
		this.maxWidth = null;

		this.canEdit = true;
		this.canResize = true;
		this.canSort = true;
		this.canMove = true;
		this.canFilter = true;
		this.canHighlight = true;
		this.canFocus = true;

		this.isVisible = true;
		this.index = -1;

		this.$label = null;
		this.$value = null;
	}

	toString() {
		return `${this.type}: ${this.title}`;
	}
}