import { SelectionState } from './selection.state';
import { Model } from '../../model/model';
import { SelectionService } from '../selection.service';

export declare class SingleOnlySelectionState extends SelectionState {
	constructor(model: Model, service: SelectionService);

	item: any;
	entries(): any[];
}
