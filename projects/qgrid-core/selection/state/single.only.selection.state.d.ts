import { Model } from '../../model/model';
import { SelectionService } from '../selection.service';
import { SubSelectionState } from './selection.state';

export declare class SingleOnlySelectionState extends SubSelectionState {
	constructor(model: Model, service: SelectionService);

	item: any;
	entries(): any[];
}
