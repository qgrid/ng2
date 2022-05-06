import { isArray } from '../../utility/kit';
import { MultipleSelectionState } from './multiple.selection.state';

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
