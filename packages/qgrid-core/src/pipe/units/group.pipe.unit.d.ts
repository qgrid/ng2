import { PipeFolder, PipeCallback, PipeUnitWhy } from '../pipe.types';

export declare type GroupPipeUnit = [
    PipeCallback<any, PipeFolder>,
    PipeCallback<PipeFolder, PipeFolder>,
    PipeCallback<PipeFolder, PipeFolder>,
] & { why: PipeUnitWhy };

export declare const groupPipeUnit: GroupPipeUnit;
