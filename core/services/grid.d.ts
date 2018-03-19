import { Model } from '../infrastructure/model';
import { IContext, IMemo } from '../pipe/pipe.item';
import { PersistenceService } from '../persistence/persistence.service';

/**
 * > Under Construction.
 */
export declare class GridService {
	constructor(model: Model);

	state: PersistenceService;

	invalidate(
		source?: string,
		changes?: object,
		pipe?: ((memo: any, context: IContext, next: (param: IMemo) => void) => any)[]
	): Promise<any>;
	busy(): () => void;
}
