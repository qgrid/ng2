import { SingleSelectionState } from './single.selection.state';
import { MultipleSelectionState } from './multiple.selection.state';
import { RangeSelectionState } from './range.selection.state';
import { Model } from '../../infrastructure/model';
import { SelectionService } from '../selection.service';

export declare function formFactory(model: Model, service: SelectionService):
	(model: Model, service: SelectionService) => SingleSelectionState | MultipleSelectionState | RangeSelectionState;
