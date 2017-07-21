import {SingleSelectionState} from './single.selection.state';
import {MultipleSelectionState} from './multiple.selection.state';
import {RangeSelectionState} from './range.selection.state';
import {Model} from "../../infrastructure/model";
import {SelectionService} from "../selection.service";

export interface ISelectionStateFactoryShape{
	(model: Model, service: SelectionService): SelectionStateFactoryReturnType;
}

export declare type SelectionStateFactoryReturnType = SingleSelectionState | MultipleSelectionState | RangeSelectionState;

export declare function selectionStateFactory(model: Model, service: SelectionService): SelectionStateFactoryReturnType;
