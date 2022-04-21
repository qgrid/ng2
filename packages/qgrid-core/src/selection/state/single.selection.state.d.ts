import { Model } from '../../model/model';
import { SelectionService } from '../selection.service';
import { SubSelectionState } from './selection.state';

export declare class SingleSelectionState extends SubSelectionState {
	item: any;

	constructor(model: Model, service: SelectionService);

	entries(): any[];
}
