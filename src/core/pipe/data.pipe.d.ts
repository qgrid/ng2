import {PipeContext, PipeMemo} from './pipe.item';

/**
 * The intent is to fill data `rows` property and setup initial set of data `columns` with 
 * or without auto generation to use them in the next pipes.
 */
export declare const dataPipe: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
