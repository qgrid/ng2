import {SelectionState} from './selection.state';

export class SingleSelectionState extends SelectionState {
	constructor(model, service) {
		super(model, service);

		this.item = null;
	}

	entries() {
		return this.item ? [this.item] : [];
	}

	selectCore(item, state) {
		if (state) {
			this.item = item;
		}
		else {
			this.item = null;
		}
	}

	stateCore(item, key) {
		return this.item !== null && key(item) === key(this.item);
	}

	clearCore() {
		this.item = null;
	}
}