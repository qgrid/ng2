import {PipeContext, PipeMemo} from './pipe.item';


export declare const memoPipe: (memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any;
