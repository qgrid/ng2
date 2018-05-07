export class ClipboardModel {
	constructor() {
		this.shortcut = {
			copy: 'ctrl+c',
			paste: 'ctrl+v'
		};
		this.source = ['body'] // ['head', 'body', 'foot']
	}
}
