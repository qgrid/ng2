import { PipeCallback, PipeUnitWhy } from '../pipe.types';

export declare type RowDetailsPipeUnit = [
    PipeCallback<any, any[]>,
] & { why: PipeUnitWhy };

export declare const rowDetailsPipeUnit: RowDetailsPipeUnit;
