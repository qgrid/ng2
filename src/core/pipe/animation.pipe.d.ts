import { PipeContext, PipeMemo } from './pipe.item';

/**
 * The intent is to apply animation to rows before they will be re-rendered
 */
export declare const animationPipe: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
