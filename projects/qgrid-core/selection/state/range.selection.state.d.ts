import { MultipleSelectionState } from './multiple.selection.state';
import { Model } from '../../infrastructure/model';
import { SelectionService } from '../selection.service';

export declare class RangeSelectionState extends MultipleSelectionState {
	constructor(model: Model, service: SelectionService);

	select(item: any, state: boolean): void;
}
