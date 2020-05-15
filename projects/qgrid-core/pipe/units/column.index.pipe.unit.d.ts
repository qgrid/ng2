import { PipeFolder, PipeCallback, MemoPipe } from '../pipe.types';
import { Node } from '../../node/node';

export declare type ColumnIndexPipeUnit = [
    PipeCallback<any, Node>,
    MemoPipe<Node>,
    MemoPipe<PipeFolder>,
    MemoPipe<PipeFolder>,
];

export declare const columnIndexPipeUnit: ColumnIndexPipeUnit;
