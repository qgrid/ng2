import {Model} from "../infrastructure/model";
import {INoopResult} from "../utility/utility";

export interface IBusyResult{
	(): void;
}

export interface IPipe{
	(memo: any, context: any, next: (memo: any) => void);
}

export declare class GridService {

	constructor(public model: Model, public apply: INoopResult);

	invalidate(source: string, changes: object, pipe: IPipe[]): Promise<any>;

	busy(): IBusyResult;
}