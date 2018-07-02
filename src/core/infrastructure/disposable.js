import { Guard } from '../infrastructure/guard';

export class Disposable {
	constructor() {
		this.disposes = [];
	}

	using(instance) {
		if (instance instanceof Disposable) {
			this.disposes.push(() => instance.dispose());
			return instance;
		}

		Guard.invokable(instance, 'instance');
		this.disposes.push(instance);
		return instance;
	}

	dispose() {
		const temp = this.disposes;
		this.disposes = [];
		for (let dispose of temp) {
			dispose();
		}
	}
}