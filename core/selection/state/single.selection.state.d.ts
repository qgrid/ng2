import {SelectionState} from './selection.state';
import {Model} from "../../infrastructure/model";
import {SelectionService} from "../selection.service";

export declare class SingleSelectionState extends SelectionState {
	constructor(model: Model, service: SelectionService);
	item: object;
	entries(): any[];
}