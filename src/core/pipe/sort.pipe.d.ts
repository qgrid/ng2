import { PipeContext, PipeMemo } from './pipe.item';

/**
 * Applies client side sorting, supports sorting by multiple columns.
 */
export declare const sortPipe: (rows: any[], context: PipeContext, next: (param: PipeMemo) => void) => any;
