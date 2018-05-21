import { MultipleSelectionState } from './multiple.selection.state';
import { isArray } from '../../utility/kit';

export class RangeSelectionState extends MultipleSelectionState {
	constructor(model, service) {
		super(model, service);
	}

	select(item, state = true) {
		if (isArray(item)) {
			this.clear();
		}

		super.select(item, state);
	}
}