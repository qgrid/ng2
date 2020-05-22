import { PipeFolder, MemoPipe } from '../pipe.types';

export declare type ColumnPipeUnit = [
    MemoPipe<any>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
] & { why: any };

export declare const columnPipeUnit: ColumnPipeUnit;
