export interface IStatement {
	type: string;
	templateKey: string;
	defaults?: any;
}

export class EmptyStatement implements IStatement {
	type = 'empty';
	templateKey = 'eb-empty.tpl.html';
}
