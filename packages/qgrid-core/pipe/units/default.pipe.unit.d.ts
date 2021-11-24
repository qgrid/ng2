import { RowsPipe, MemoPipe, PipeFolder, PipeUnitWhy } from '../pipe.types';


export declare type DefaultPipeUnit = [
    RowsPipe,
    RowsPipe,
    RowsPipe,
    MemoPipe<any[]>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
] & { why: PipeUnitWhy };

export declare const defaultPipeUnit: DefaultPipeUnit;