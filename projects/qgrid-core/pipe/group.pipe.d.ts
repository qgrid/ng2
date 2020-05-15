import { PipeFolder, MemoPipe } from './pipe.types';

/**
 * The intent is to build nodes from the raw data rows and fill in memo nodes section if group model has some input.
 */
export declare const groupPipe: MemoPipe<PipeFolder>;