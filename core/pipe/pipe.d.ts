import {IDataPipe} from "./data.pipe";
import {IFilterPipe} from "./filter.pipe";
import {IPaginationPipe} from "./pagination.pipe";
import {ISortPipe} from "./sort.pipe";
import {IMemoPipe} from "./memo.pipe";
import {IGroupPipe} from "./group.pipe";
import {IPivotPipe} from "./pivot.pipe";
import {IColumnPipe} from "./column.pipe";
import {IViewPipe} from "./view.pipe";

export declare class Pipe {

	static readonly data: IDataPipe;

	static readonly filter: IFilterPipe;

	static readonly pagination: IPaginationPipe;

	static readonly sort: ISortPipe;

	static readonly memo: IMemoPipe;

	static readonly group: IGroupPipe;

	static readonly pivot: IPivotPipe;

	static readonly column: IColumnPipe;

	static readonly view: IViewPipe;
}