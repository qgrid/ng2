import { MemoPipe, PipeFolder, PipeUnitWhy, RowsPipe } from '../pipe.types';

export declare type ViewPipeUnit = [
    RowsPipe,
    MemoPipe<any[]>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
] & { why: PipeUnitWhy };

export declare const viewPipeUnit: ViewPipeUnit;
