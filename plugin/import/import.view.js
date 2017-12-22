import {PluginView} from '../plugin.view';
import {Command} from '@grid/core/command';
import {upload} from '@grid/core/services/upload';
import {readFile} from './read';

export class ImportView extends PluginView {
	constructor(model, context) {
		super(...arguments);

		const element = context.element;

		this.options = context.options;

		this.upload = new Command({
			source: 'import',
			execute: () => upload(element)
		});
	}

	load(e) {
		const files = e.target.files;

		for (let file of files) {
			const reader = new FileReader();
			reader.onload = e => {
				readFile(e, file, this.model, this.options);
			};
			reader.readAsBinaryString(file);
		}
	}
}
