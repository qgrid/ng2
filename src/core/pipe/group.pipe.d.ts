import {PipeContext, PipeMemo} from './pipe.item';

/**
 * The intent is to build nodes from the raw data rows and fill in memo nodes section if group model has some input.
 */
export declare const groupPipe: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
