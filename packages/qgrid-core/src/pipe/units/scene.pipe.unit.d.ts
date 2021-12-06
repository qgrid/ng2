import { PipeCallback, MemoPipe, PipeFolder, PipeUnitWhy } from '../pipe.types';

export declare type ScenePipeUnit = [
    PipeCallback<any[], any[]>,
    MemoPipe<any[]>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
]& { why: PipeUnitWhy };

export declare const scenePipeUnit: ScenePipeUnit;