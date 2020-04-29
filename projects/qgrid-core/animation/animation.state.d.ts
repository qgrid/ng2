import { PipeContext } from '../pipe/pipe.item';

export declare class AnimationState {
	apply: Array<(memo: any, context: PipeContext, complete: () => void) => void>;
}