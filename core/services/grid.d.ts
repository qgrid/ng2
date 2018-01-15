import { INoopResult } from '../utility/utility';
import { Model } from '../infrastructure/model';
import { IPipe } from '../pipe/pipe.item';

/**
 * > Under Construction.
 */
export declare class GridService {
    constructor(model: Model, apply: INoopResult);

    apply: INoopResult;

    invalidate(source?: string, changes?: object, pipe?: IPipe[]): Promise<any>;

    busy(): () => void;
}
