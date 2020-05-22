import {PipeContext, PipeMemo} from './pipe.item';


export declare class PipeUnit {
	static readonly column: [(_: any, context: PipeContext, next: (memo: PipeMemo) => void) => void];
	static readonly columnIndex: [(_: any, context: PipeContext, next: (memo: PipeMemo) => void) => void];
	static readonly default:  [(rows: any[], context: PipeContext, next: (rows: any[]) => void) => void];
	static readonly group: [(rows: any[], context: PipeContext, next: (memo: PipeMemo) => void) => void];
	static readonly rowDetails: [(rows: any[], context: PipeContext, next: (memo: PipeMemo) => void) => void];
	static readonly view:  [(rows: any[], context: PipeContext, next: (rows: any[]) => void) => void];
	static readonly scene:  [(rows: any[], context: PipeContext, next: (rows: any[]) => void) => void];
	static readonly row:  [(rows: any[], context: PipeContext, next: (rows: any[]) => void) => void];
}
