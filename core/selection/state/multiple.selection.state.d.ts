import {SelectionState} from './selection.state';
import {Model} from "../../infrastructure/model";
import {SelectionService} from "../selection.service";

export declare class MultipleSelectionState extends SelectionState {
	constructor(model: Model, service: SelectionService);

	items: Map;

	entries(): any[];
}