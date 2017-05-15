import {SelectionState} from './selection.state';

export class SingleSelectionState extends SelectionState {
	constructor(model) {
		super(model);

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

	stateCore(item) {
		return this.item && this.key(item) === this.key(this.item);
	}

	clearCore() {
		this.item = null;
	}
}