import { Model } from '../../model/model';
import { SelectionService } from '../selection.service';
import { MultipleSelectionState } from './multiple.selection.state';
import { RangeSelectionState } from './range.selection.state';
import { SingleSelectionState } from './single.selection.state';

export declare function selectionStateFactory(model: Model, service: SelectionService):
	(model: Model, service: SelectionService) => SingleSelectionState | MultipleSelectionState | RangeSelectionState;
