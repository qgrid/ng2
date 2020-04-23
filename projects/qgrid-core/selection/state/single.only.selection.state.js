import { SelectionState } from './selection.state';

export class SingleOnlySelectionState extends SelectionState {
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
	}

	canSelectCore(item) {
		return item !== this.item;
	}

	stateCore(item, key) {
		return this.item !== null && key(item) === key(this.item);
	}

	clearCore() {
		this.item = null;
	}
}