import { SelectionState } from './selection.state';
import { Model } from '../../infrastructure/model';
import { SelectionService } from '../selection.service';

export declare class SingleOnlySelectionState extends SelectionState {
	constructor(model: Model, service: SelectionService);

	item: any;
	entries(): any[];
}
