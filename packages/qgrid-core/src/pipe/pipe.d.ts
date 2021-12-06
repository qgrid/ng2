import { PipeFolder, RowsPipe, MemoPipe } from './pipe.types';

export declare class Pipe {
	static readonly data: RowsPipe;
	static readonly filter: RowsPipe;
	static readonly pagination: RowsPipe;
	static readonly sort: RowsPipe;
	static readonly memo: MemoPipe<any[]>;
	static readonly group: MemoPipe<PipeFolder>;
	static readonly pivot: MemoPipe<PipeFolder>;
	static readonly column: MemoPipe<PipeFolder>;
	static readonly columnIndex: MemoPipe<PipeFolder>;
	static readonly animation: MemoPipe<PipeFolder>;
	static readonly view: MemoPipe<PipeFolder>;
	static readonly scene: MemoPipe<PipeFolder>;
}
