export interface IStatement {
  type: string;
  templateKey: string;
  defaults?: unknown;
}

export class EmptyStatement implements IStatement {
  type = 'empty';
  templateKey = 'eb-empty.tpl.html';
}
