import {isArray} from '../../utility';
import {Node} from '../../node';

export class SelectionState {
	constructor(model, service) {
		this.model = model;
		this.service = service;
	}

	select(item, state = true, key) {
		key = key || this.keyFactory();
		if (isArray(item)) {
			item.forEach(item => this.select(item, state, key));
			return;
		}

		if (item instanceof Node) {
			const rows = this.model.data().rows;
			if (rows.length) {
				item.rows.forEach(index => this.select(rows[index], state, key));
				return;
			}
		}

		this.selectCore(item, state, key);
	}

	toggle(item) {
		const state = this.state(item);
		return this.select(item, state === null || !state);
	}

	state(item, key) {
		key = key || this.keyFactory();
		if (isArray(item)) {
			const all = item.every(item => this.state(item, key));
			return all ? true : item.some(item => this.state(item, key)) ? null : false;
		}

		if (item instanceof Node) {
			const rows = this.model.data().rows;
			if (rows.length) {
				const all = item.rows.length && item.rows.every(index => this.state(rows[index], key));
				return all ? true : item.rows.some(index => this.state(rows[index], key)) ? null : false;
			}
		}

		return this.stateCore(item, key);
	}

	keyFactory() {
		return this.service.hashFactory();
	}

	clear() {
		this.clearCore();
	}

	selectCore() {
	}

	clearCore() {
	}

	stateCore() {
		return false;
	}
}