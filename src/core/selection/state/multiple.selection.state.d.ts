import { SelectionState } from './selection.state';

export declare class MultipleSelectionState extends SelectionState {
	constructor();

	items: Map<any, any>;
	entries(): any[];
}
