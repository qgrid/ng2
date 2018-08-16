import { Model } from '../infrastructure/model';
import { setup } from '../setup';

let isOpen = true;
export function modelFactory() {
	if (isOpen) {
		setup(Model);
		isOpen = false;
	}

	return new Model();
}
