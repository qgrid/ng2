import {Guard} from '../infrastructure';

export class DisposableView {
	constructor() {
		this.disposes = [];
	}

	using(dispose) {
		Guard.invokable(dispose, 'dispose');

		this.disposes.push(dispose);
		return this.dispose.bind(this);
	}

	dispose() {
		const temp = this.disposes;
		this.disposes = [];
		for (let dispose of temp) {
			dispose();
		}
	}
}