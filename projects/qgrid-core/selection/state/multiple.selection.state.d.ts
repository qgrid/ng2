import { SubSelectionState } from './selection.state';

export declare class MultipleSelectionState extends SubSelectionState {
	constructor();

	items: Map<any, any>;
	entries(): any[];
}
