import { PipeContext } from '../pipe/pipe.item';

export declare interface AnimationModel {
	apply: Array<(memo: any, context: PipeContext, complete: () => void) => void>;
}