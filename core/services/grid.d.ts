import {INoopResult} from '../utility/utility';
import {Model} from '../infrastructure/model';

export interface IBusyResult {
	(): void;
}

export interface IPipe {
	(memo: any, context: any, next: (memo: any) => void);
}

export declare class GridService {
	constructor(model: Model, apply: INoopResult);

	apply: INoopResult;

	invalidate(source?: string, changes?: object, pipe?: IPipe[]): Promise<any>;

	busy(): IBusyResult;
}
