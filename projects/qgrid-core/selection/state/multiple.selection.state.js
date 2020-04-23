import {SelectionState} from './selection.state';

export class MultipleSelectionState extends SelectionState {
	constructor(model, service) {
		super(model, service);

		this.items = new Map();
	}

	entries() {
		return Array.from(this.items.values());
	}

	selectCore(item, state, key) {
		if (state) {
			this.items.set(key(item), item);
		}
		else {
			this.items.delete(key(item));
		}
	}

	stateCore(item, key) {
		return this.items.has(key(item));
	}

	clearCore() {
		this.items = new Map();
	}
}