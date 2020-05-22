import { Model } from '../../model/model';
import { SelectionService } from '../selection.service';

export declare class SelectionState {
	constructor(model: Model, service: SelectionService);

	model: Model;
	service: SelectionService;

	select(item: any | any[], state: boolean, key: string): void;
	canSelect(item: any | any[], state: boolean, key: string): void;
	toggle(item: any | any[]): (item: any | any[], state: boolean, key: string) => void;
	state(item: any | any[], key: string): boolean;
	keyFactory(): (key: string) => any;
	clear(): void;
}
