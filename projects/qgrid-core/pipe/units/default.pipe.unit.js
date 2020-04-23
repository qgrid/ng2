import { Pipe } from '../pipe';

export const defaultPipeUnit = [
	Pipe.data,
	Pipe.filter,
	Pipe.sort,
	Pipe.memo,
	Pipe.group,
	Pipe.pivot,
	Pipe.column,
	Pipe.view,
	Pipe.pagination,
	Pipe.animation,
	Pipe.scene
];

defaultPipeUnit.why = 'refresh';