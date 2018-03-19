import { Model } from '../../infrastructure/model';
import { SelectionService } from '../selection.service';

export declare class SelectionState {
	constructor(model: Model, service: SelectionService);

	model: Model;
	service: SelectionService;

	select(item: Node | Node[], state: boolean, key: string): void;
	toggle(item: Node | Node[]): (item: Node | Node[], state: boolean, key: string) => void;
	state(item: Node | Node[], key: string): boolean;
	keyFactory(): (key: string) => any;
	clear(): void;
}
