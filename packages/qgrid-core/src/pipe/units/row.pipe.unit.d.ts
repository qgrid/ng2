import { PipeCallback, PipeFolder, PipeUnitWhy } from '../pipe.types';

export declare type RowPipeUnit = [
    PipeCallback<any, PipeFolder>,
    PipeCallback<PipeFolder, PipeFolder>,
    PipeCallback<PipeFolder, any[]>,
] & { why: PipeUnitWhy };

export declare const rowPipeUnit: RowPipeUnit;
