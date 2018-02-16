import { INoopResult } from '../utility/utility';
import { Model } from '../infrastructure/model';
import { IPipe } from '../pipe/pipe.item';
import { PersistenceService } from '../persistence/persistence.service';

/**
 * > Under Construction.
 */
export declare class GridService {
	 constructor(model: Model);

	 state: PersistenceService;

    invalidate(source?: string, changes?: object, pipe?: IPipe<any>[]): Promise<any>;

    busy(): () => void;
}
