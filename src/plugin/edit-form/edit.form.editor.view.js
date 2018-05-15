import {PluginView} from '../plugin.view';

export class EditFormEditorView extends PluginView {
	constructor(model, context) {
		super(model);

		this.editor = context.editor;
	}
}